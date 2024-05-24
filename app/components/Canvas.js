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

    ctx.save();
    lines.forEach((line, index) => {
      ctx.fillText(line, position.x, position.y + index * lineHeight);
    });
    ctx.restore();
  }, [boldText, italicText, fontSize, selectedFont, color, text, position, showVerticalLine, showHorizontalLine]);

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
  }, [size, drawTextOnCanvas]);

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const img = new Image();
    img.src = imgSource;
    imgRef.current = img;
    drawImageOnOffscreenCanvas();
  }, [imgSource, drawImageOnOffscreenCanvas]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

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

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const threshold = fontSize;

      const newPosition = { x: mouseX - offset.x, y: mouseY - offset.y };
      setPosition(newPosition);

      const ctx = canvas.getContext("2d");
      const lines = text.split("\n");
      const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
      const textHeight = fontSize * lines.length * 1.2;

      const nearVerticalCenter =
        (newPosition.x <= centerX && newPosition.x + textWidth >= centerX);
      const nearHorizontalCenter =
        (newPosition.y - fontSize <= centerY && newPosition.y + textHeight - fontSize >= centerY);

      setShowVerticalLine(nearVerticalCenter);
      setShowHorizontalLine(nearHorizontalCenter);

      drawTextOnCanvas();
    }
  };

  const throttledMouseMove = useCallback(throttle(handleMouseMove, 16), [handleMouseMove]);

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    throttledMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setShowVerticalLine(false);
    setShowHorizontalLine(false);
    drawTextOnCanvas();
  };

  const handleTouchEnd = () => {
    handleMouseUp();
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
        onMouseMove={throttledMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onMouseLeave={handleMouseUp}
        onTouchCancel={handleTouchEnd}
      />
      <canvas ref={offscreenCanvasRef} style={{ display: "none" }} />
    </>
  );
};

export default Canvas;

// Utility function to throttle the mouse/touch move events
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
