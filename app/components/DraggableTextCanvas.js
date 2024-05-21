"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Script from "next/script";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const DraggableTextCanvas = ({
  text,
  color,
  fontSize,
  selectedFont,
  boldText,
  italicText,
  imgSource,
}) => {
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const drawTextOnCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvasRef.current, 0, 0);

    ctx.font = `${boldText} ${italicText} ${fontSize}px ${selectedFont}`;
    ctx.fillStyle = color;

    const lines = text.split("\n");
    lines.forEach((line, index) => {
      ctx.fillText(line, position.x, position.y + index * 50);
    });
  }, [boldText, italicText, fontSize, selectedFont, color, text, position]);

  const drawImageOnOffscreenCanvas = useCallback(() => {
    const offscreenCanvas = offscreenCanvasRef.current;
    const offscreenCtx = offscreenCanvas.getContext("2d");

    offscreenCanvas.width = 600;
    offscreenCanvas.height = 400;

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
  }, [drawTextOnCanvas]);

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
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    const lines = text.split("\n");
    const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
    const textHeight = fontSize * lines.length;

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

  const handleMouseMove = (e) => {
    if (dragging) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      requestAnimationFrame(() => {
        setPosition({ x: mouseX - offset.x, y: mouseY - offset.y });
        drawTextOnCanvas();
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;

    const newCanvas = document.createElement("canvas");
    newCanvas.width = 600;
    newCanvas.height = 400;
    const newCtx = newCanvas.getContext("2d");

    newCtx.drawImage(offscreenCanvasRef.current, 0, 0);

    // Draw the text scaled to the new resolution
    newCtx.font = `${boldText} ${italicText} ${fontSize}px ${selectedFont}`;
    newCtx.fillStyle = color;
    const lines = text.split("\n");
    lines.forEach((line, index) => {
      newCtx.fillText(line, position.x, (position.y + index * 50));
    });

    const link = document.createElement("a");
    link.download = `banner_${newCanvas.width}x${newCanvas.height}.png`;
    link.href = newCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
        onLoad={() => console.log("WebFontLoader script loaded")}
      />
      <Stack spacing={2}>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={{ border: "1px solid black" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <Button onClick={handleDownload} variant="contained">
          Download
        </Button>
      </Stack>
      <canvas ref={offscreenCanvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default DraggableTextCanvas;
