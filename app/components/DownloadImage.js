import React from "react";

export default function DownloadImage({ source }) {

  const download = (filename, content) => {
    var element = document.createElement("a");
    element.setAttribute("href", content);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const handleDownload = async (e) => {
    try {
      const result = await fetch(`${source}`, {
        method: "GET",
        headers: {},
      });
      const blob = await result.blob();
      const url = URL.createObjectURL(blob);
      download("test", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <img src={`${source}`} width={100} height={100} />
      <button onClick={handleDownload} type="button">
        Download Image
      </button>
    </div>
  );
}
