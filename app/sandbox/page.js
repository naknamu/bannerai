"use client"

import React, { useEffect, useRef } from 'react';

function CanvasComponent() {
    const canvasRef = useRef(null);

    useEffect(() => {
      drawOnCanvas()
    }, [])

    // Function to draw on the canvas
    const drawOnCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 100, 100);
    };

    // Function to handle the download button click
    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'banner.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    // Function to clear the canvas
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div>
            <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid #000000' }}></canvas>
            <br />
            <button onClick={handleDownload}>Download Image</button>
            <button onClick={clearCanvas}>Clear Canvas</button>
        </div>
    );
}

export default CanvasComponent;
