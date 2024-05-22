"use client";

import { useState, useRef } from "react";
import { generateImage } from "./actions";
import style from "./page.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import Canvas from "./components/Canvas";
import Tooltip from "@mui/material/Tooltip";
import FontStyles from "./components/FontStyles";
import ImageSizes from "./components/ImageSizes";
import Download from "./components/Download";

const IMAGE_SIZES = [
  // { w: 600, h: 400 },
  // { w: 1200, h: 800 },
  // { w: 940, h: 788 },
  { w: 1024, h: 1024 },
  { w: 1152, h: 896 },
  { w: 896, h: 1152 },
  { w: 1216, h: 832 },
  { w: 1344, h: 768 },
  // { w: 768, h: 1344 },
  { w: 1536, h: 640 },
  // { w: 640, h: 1536 },
];

export default function Home() {
  const [title, setTitle] = useState("I am a text overlay");
  const [detail, setDetail] = useState("");
  const [base64String, setBase64String] = useState(["test"]);
  const [isGenerated, setIsGenerated] = useState(true);
  // const [base64String, setBase64String] = useState([]);
  // const [isGenerated, setIsGenerated] = useState(false);
  const [isDetailEmpty, setIsDetailEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#000");
  const [fontSize, setFontSize] = useState(75);
  const [selectedFont, setSelectedFont] = useState("");
  const [boldText, setBoldText] = useState("");
  const [italicText, setItalicText] = useState("");
  const offscreenCanvasRef = useRef(null);

  const [size, setSize] = useState(IMAGE_SIZES[0]);
  const [displaySize, setDisplaySize] = useState({
    w: IMAGE_SIZES[0].w / 2,
    h: IMAGE_SIZES[0].h / 2,
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (detail === "") {
      setIsDetailEmpty(true);
      return;
    }

    const data = await generateImage(detail, size);
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
          {/* <Link href="/sandbox">Sandbox</Link> */}
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

        {isGenerated && (
          <>
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
            <ImageSizes
              size={size}
              setSize={setSize}
              setDisplaySize={setDisplaySize}
              IMAGE_SIZES={IMAGE_SIZES}
            />
            <Download
              size={size}
              offscreenCanvasRef={offscreenCanvasRef}
              fontSize={fontSize}
              boldText={boldText}
              italicText={italicText}
              selectedFont={selectedFont}
            />
          </>
        )}
      </div>

      {isGenerated ? (
        <div className={style.canvas_container}>
          {base64String.map((base64, index) => (
            <div key={index}>
              <Canvas
                text={title}
                color={color}
                fontSize={fontSize}
                selectedFont={selectedFont}
                boldText={boldText}
                italicText={italicText}
                // imgSource={`data:image/png;base64,${base64}`}
                imgSource={"/static/images/templates/grass.jpg"}
                size={size}
                displaySize={displaySize}
                IMAGE_SIZES={IMAGE_SIZES}
                offscreenCanvasRef={offscreenCanvasRef}
              />
            </div>
          ))}
        </div>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        ""
      )}
    </div>
  );
}
