"use client";

import Image from "next/image";
import { useState } from "react";
import { generateImage } from "./actions";
import style from "./page.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import DownloadImage from "./components/DownloadImage";
import Link from "next/link";
import DraggableTextCanvas from "./components/DraggableTextCanvas";
import Tooltip from "@mui/material/Tooltip";
import FontStyles from "./components/FontStyles";

export default function Home() {
  const [title, setTitle] = useState("I am a text overlay");
  const [detail, setDetail] = useState("");
  const [base64String, setBase64String] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDetailEmpty, setIsDetailEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#808080");
  const [fontSize, setFontSize] = useState(42);
  const [selectedFont, setSelectedFont] = useState("");
  const [boldText, setBoldText] = useState("");
  const [italicText, setItalicText] = useState("");

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
          <Link href="/sandbox">Sandbox</Link>
        </div>

        <TextField
          label="I am a text overlay (optional)"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
          multiline
          maxRows={5}
        />

        <TextField
          label="Description of the image"
          variant="outlined"
          onChange={(e) => setDetail(e.target.value)}
          required
          error={!isDetailEmpty}
          helperText={!isDetailEmpty ? "Required field." : ""}
        />

        <Tooltip title="Generate background image">
          <Button
            onClick={(e) => handleGenerate(e)}
            variant="contained"
            disabled={isLoading}
          >
            Generate
          </Button>
        </Tooltip>
      </div>

      <div className={style.image_container}>
        <FontStyles
          color={color}
          selectedFont={selectedFont}
          fontSize={fontSize}
          setColor={setColor}
          setFontSize={setFontSize}
          setSelectedFont={setSelectedFont}
          setBoldText={setBoldText}
          setItalicText={setItalicText}
        />

        {isGenerated ? (
          base64String.map((base64, index) => (
            <div>
              <Image
                src={`data:image/png;base64,${base64}`}
                alt="Generated Image"
                width={500}
                height={500}
                priority
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
                <DraggableTextCanvas
                  text={title}
                  color={color}
                  fontSize={fontSize}
                  selectedFont={selectedFont}
                  boldText={boldText}
                  italicText={italicText}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
