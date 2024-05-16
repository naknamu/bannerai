"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { generateImage } from "./actions";
import style from "./page.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Draggable from "./components/Draggable";
import DownloadImage from "./components/DownloadImage";

export default function Home() {
  const [title, useTitle] = useState("");
  const [detail, useDetail] = useState("");
  const [base64String, setBase64String] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDetailEmpty, setIsDetailEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    if (img) {
      ctx.drawImage(img, 0, 0);
      ctx.font = "40px Roboto";
      ctx.fillText(title, 100, 100);
    }
  }, [title]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (detail === "") {
      setIsDetailEmpty(true);
      return;
    }

    const data = await generateImage(detail);
    data.map((image) => {
      setBase64String((oldValue) => [...oldValue, image.base64]);
    });

    setIsLoading(false);
    setIsGenerated(true);
  };

  return (
    <div className={style.page_container}>
      <div className={style.input_container}>
        <div className={style.hero}>
          <h1>Design blog banners</h1>
          <h1>with just a click</h1>
        </div>

        <TextField
          label="I am a text overlay (optional)"
          variant="outlined"
          onChange={(e) => useTitle(e.target.value)}
          multiline
          maxRows={5}
        />
        <TextField
          label="Description of the image"
          variant="outlined"
          onChange={(e) => useDetail(e.target.value)}
          required
          error={!isDetailEmpty}
          helperText={!isDetailEmpty ? "Required field." : ""}
        />

        <Button
          onClick={(e) => handleGenerate(e)}
          variant="contained"
          disabled={isLoading}
        >
          Generate
        </Button>

        <DownloadImage source={"/static/images/templates/grass.jpg"} />
      </div>

      <div className={style.image_container}>
        {isGenerated ? (
          base64String.map((base64, index) => (
            <div>
              <canvas key={index} width={500} height={500} />
              <Image
                src={`data:image/png;base64,${base64}`}
                alt="Generated Image"
                width={500}
                height={500}
                priority
                ref={imageRef}
              />
              <DownloadImage source={`data:image/png;base64,${base64}`} />
            </div>
          ))
        ) : (
          <div>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <div>
                <canvas ref={canvasRef} width={500} height={500} />
                <Image
                  src="/static/images/templates/grass.jpg"
                  alt="Sample image"
                  width={500}
                  height={500}
                  priority
                  className={style.image}
                  ref={imageRef}
                />
              </div>
            )}
          </div>
        )}
        {/* {title && <Draggable content={title} />} */}
      </div>
    </div>
  );
}
