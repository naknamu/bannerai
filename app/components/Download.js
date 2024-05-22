import Button from "@mui/material/Button";

export default function Download({
  size,
  offscreenCanvasRef,
  fontSize,
  boldText,
  italicText,
  selectedFont,
}) {
  const handleDownload = () => {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = size.w;
    newCanvas.height = size.h;
    const newCtx = newCanvas.getContext("2d");

    newCtx.drawImage(offscreenCanvasRef.current, 0, 0);

    // Draw the text scaled to the new resolution
    const lineHeight = fontSize * 1.2;
    newCtx.font = `${boldText} ${italicText} ${fontSize}px ${selectedFont}`;
    newCtx.fillStyle = color;
    const lines = text.split("\n");
    lines.forEach((line, index) => {
      newCtx.fillText(line, position.x, position.y + index * lineHeight);
    });

    newCtx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation matrix

    const link = document.createElement("a");
    link.download = `banner_${newCanvas.width}x${newCanvas.height}.png`;
    link.href = newCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Button onClick={handleDownload} variant="contained">
      Download
    </Button>
  );
}
