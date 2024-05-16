import React, { useRef, useEffect } from 'react';

const Canvas = ({ text }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.font = '40px Courier';
      ctx.fillText(text, 210, 75);
    };
  }, [text]);

  return (
    <div>
      <canvas ref={canvasRef} width={640} height={425} />
      <img ref={imageRef} src={cheese} className="hidden" alt="hidden" />
    </div>
  );
};

export default Canvas;