"use client";

import React, { useRef, useState, useEffect } from "react";
import Script from "next/script";

const DraggableTextCanvas = ({ text, color, fontSize, selectedFont }) => {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function drawTextOnCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the text
    ctx.font = `${fontSize}px ${selectedFont}`;
    ctx.fillStyle = color;

    const lines = text.split("\n");
    lines.forEach((line, index) => {
      ctx.fillText(line, position.x, position.y + index * 50);
    });
  }

  useEffect(() => {
    if (!selectedFont) return;

    const WebFontLoader = require("webfontloader");
    WebFontLoader.load({
      google: {
        families: [selectedFont],
      },
      fontactive: function (familyName, fvd) {
        // This function is called once the font is loaded and active
        // console.log(`${familyName} is active`);
        drawTextOnCanvas();
      },
    });
  }, [text, position, color, fontSize, selectedFont]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    const lines = text.split("\n");
    const textWidth = Math.max(
      ...lines.map((line) => ctx.measureText(line).width)
    );
    const textHeight = fontSize * lines.length; // Approximate height of the text in pixels

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

      setPosition({ x: mouseX - offset.x, y: mouseY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
        onLoad={() => console.log("WebFontLoader script loaded")}
      />
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <p style={{ fontFamily: selectedFont }}>Hello World</p>
    </div>
  );
};

export default DraggableTextCanvas;
