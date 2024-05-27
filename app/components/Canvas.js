"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Script from "next/script";

const Canvas = ({
  text,
  color,
  fontSize,
  selectedFont,
  boldText,
  italicText,
  imgSource,
  size,
  displaySize,
  offscreenCanvasRef,
  position,
  setPosition,
}) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showVerticalLine, setShowVerticalLine] = useState(false);
  const [showHorizontalLine, setShowHorizontalLine] = useState(false);
  const animationFrameIdRef = useRef(null);

  // Draw text on canvas
  const drawTextOnCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvasRef.current, 0, 0, canvas.width, canvas.height);

    if (showVerticalLine || showHorizontalLine) {
      ctx.strokeStyle = "purple";
      ctx.lineWidth = 2;
      if (showVerticalLine) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
      }
      if (showHorizontalLine) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }
    }

    ctx.font = `${boldText} ${italicText} ${fontSize}px ${selectedFont}`;
    ctx.fillStyle = color;

    const lines = text.split("\n");
    const lineHeight = fontSize * 1.2;

    lines.forEach((line, index) => {
      ctx.fillText(line, position.x, position.y + index * lineHeight);
    });
  }, [boldText, italicText, fontSize, selectedFont, color, text, position, showVerticalLine, showHorizontalLine, offscreenCanvasRef]);

  // Draw image on offscreen canvas
  const drawImageOnOffscreenCanvas = useCallback(() => {
    const offscreenCanvas = offscreenCanvasRef.current;
    const offscreenCtx = offscreenCanvas.getContext("2d");

    offscreenCanvas.width = size.w;
    offscreenCanvas.height = size.h;

    const img = imgRef.current;
    if (img.complete) {
      offscreenCtx.drawImage(img, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
      drawTextOnCanvas();
    } else {
      img.onload = () => {
        offscreenCtx.drawImage(img, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
        drawTextOnCanvas();
      };
    }
  }, [size, drawTextOnCanvas, offscreenCanvasRef]);

  // Load font and redraw canvas
  useEffect(() => {
    if (typeof window === "undefined" || !selectedFont) return;

    const loadFont = async () => {
      const WebFontLoader = await import("webfontloader");
      WebFontLoader.load({
        google: {
          families: [selectedFont],
        },
        fontactive: () => {
          drawTextOnCanvas();
        },
      });
    };

    loadFont();
  }, [selectedFont, drawTextOnCanvas]);

  // Load image and draw on canvas
  useEffect(() => {
    if (typeof window === "undefined") return;
    const img = new Image();
    img.src = imgSource;
    imgRef.current = img;
    drawImageOnOffscreenCanvas();
  }, [imgSource, drawImageOnOffscreenCanvas]);

  // Mouse and touch event handlers
  const handleDown = (clientX, clientY) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (clientX - rect.left) * scaleX;
    const mouseY = (clientY - rect.top) * scaleY;

    const ctx = canvas.getContext("2d");
    const lines = text.split("\n");
    const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
    const textHeight = fontSize * lines.length * 1.2;

    if (
      mouseX >= position.x &&
      mouseX <= position.x + textWidth &&
      mouseY >= position.y - fontSize &&
      mouseY <= position.y + textHeight - fontSize
    ) {
      setDragging(true);
      setOffset({ x: mouseX - position.x, y: mouseY - position.y });
    }
  };

  const handleMove = (clientX, clientY) => {
    if (dragging) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mouseX = (clientX - rect.left) * scaleX;
      const mouseY = (clientY - rect.top) * scaleY;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const newPosition = { x: mouseX - offset.x, y: mouseY - offset.y };
      setPosition(newPosition);

      const ctx = canvas.getContext("2d");
      const lines = text.split("\n");
      const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
      const textHeight = fontSize * lines.length * 1.2;

      const nearVerticalCenter = newPosition.x <= centerX && newPosition.x + textWidth >= centerX;
      const nearHorizontalCenter = newPosition.y - fontSize <= centerY && newPosition.y + textHeight - fontSize >= centerY;

      setShowVerticalLine(nearVerticalCenter);
      setShowHorizontalLine(nearHorizontalCenter);

      // Use requestAnimationFrame for smooth drawing
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(() => {
        drawTextOnCanvas();
      });
    }
  };

  const handleMouseDown = (e) => handleDown(e.clientX, e.clientY);
  const handleTouchStart = (e) => handleDown(e.touches[0].clientX, e.touches[0].clientY);
  const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
  const handleUp = () => {
    setDragging(false);
    setShowVerticalLine(false);
    setShowHorizontalLine(false);
    drawTextOnCanvas();
  };

  return (
    <>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
        onLoad={() => console.log("WebFontLoader script loaded")}
      />
      <canvas
        ref={canvasRef}
        width={size.w}
        height={size.h}
        style={{
          width: displaySize.w,
          height: displaySize.h,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={handleUp}
        onTouchEnd={handleUp}
        onMouseLeave={handleUp}
        onTouchCancel={handleUp}
      />
      <canvas ref={offscreenCanvasRef} style={{ display: "none" }} />
    </>
  );
};

export default Canvas;
