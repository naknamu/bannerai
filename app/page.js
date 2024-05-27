"use client";

import { useState, useRef, useEffect } from "react";
import { generateImage } from "./actions";
import style from "./page.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Canvas from "./components/Canvas";
import Tooltip from "@mui/material/Tooltip";
import FontStyles from "./components/FontStyles";
import ImageSizes from "./components/ImageSizes";
import Download from "./components/Download";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const IMAGE_SIZES = [
  { w: 1024, h: 1024 },
  { w: 1536, h: 640 },
  { w: 1152, h: 896 },
  { w: 896, h: 1152 },
  { w: 1216, h: 832 },
  { w: 1344, h: 768 },
  // { w: 768, h: 1344 },
  // { w: 640, h: 1536 },
];

const GENERATION_LIMIT = parseInt(process.env.NEXT_PUBLIC_GENERATION_LIMIT);

export default function Home() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [base64String, setBase64String] = useState("");
  // const [isGenerated, setIsGenerated] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const [fontSize, setFontSize] = useState(75);
  const [selectedFont, setSelectedFont] = useState("");
  const [boldText, setBoldText] = useState("");
  const [italicText, setItalicText] = useState("");
  const offscreenCanvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 30, y: 90 });
  const [size, setSize] = useState(IMAGE_SIZES[0]);
  const [displaySize, setDisplaySize] = useState({
    w: IMAGE_SIZES[0].w / 2,
    h: IMAGE_SIZES[0].h / 2,
  });
  const router = useRouter();
  const [isLimit, setIsLimit] = useState(false);

  useEffect(() => {
    if (parseInt(getCookie("generationCount")) > GENERATION_LIMIT) {
      setIsLimit(true);
    }
  }, []);

  // function to limit the number of generation
  function incrementGenerationCount() {
    let count = parseInt(getCookie("generationCount")) || 0;
    count++;
    setCookie("generationCount", count, { maxAge: 86400 });
    router.refresh();

    // Limit to 10 generations
    if (count > GENERATION_LIMIT) {
      alert("Generation limit reached");
      return false; // Prevent further generations
    }
    return true; // Allow generation
  }

  const handleGenerate = async (e) => {
    e.preventDefault();

    // Check if details of the image has value
    if (detail === "") {
      setIsError(true);
      return;
    } else {
      setIsError(false);
      setIsLoading(true);
    }

    // Call this function before generating an image
    if (incrementGenerationCount()) {
      // Proceed with image generation
      const data = await generateImage(detail, size);

      data.map((image) => {
        setBase64String(image.base64);
      });

      setIsGenerated(true);
      setIsLimit(false);
    } else {
      // Inform the user they have reached the limit
      setIsLimit(true);
      setIsGenerated(false);
    }

    setIsLoading(false);
  };

  return (
    <div className={style.page_container}>
      <div className={style.input_container}>
        <div className={style.hero}>
          <h1>
            Create <span style={{ color: "var(--accent)" }}>Beautiful</span>{" "}
            Graphics
          </h1>
          <h1>
            in <span className={style.wavy_underline}>One Click</span>
          </h1>
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
          error={isError}
          helperText={isError ? "Required field." : ""}
          multiline
          maxRows={5}
        />

        <Tooltip title={!isLimit ? "Click to generate" : ""}>
          <Button
            onClick={(e) => handleGenerate(e)}
            variant="contained"
            disabled={isLoading || isLimit}
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
              color={color}
              text={title}
              position={position}
            />
          </>
        )}
      </div>

      {isGenerated && (
        <div className={style.canvas_container}>
          <Canvas
            text={title}
            color={color}
            fontSize={fontSize}
            selectedFont={selectedFont}
            boldText={boldText}
            italicText={italicText}
            imgSource={`data:image/png;base64,${base64String}`}
            // imgSource={"/static/images/templates/grass.jpg"}
            size={size}
            displaySize={displaySize}
            IMAGE_SIZES={IMAGE_SIZES}
            offscreenCanvasRef={offscreenCanvasRef}
            position={position}
            setPosition={setPosition}
          />
        </div>
      )}

      {isLoading && <CircularProgress />}
    </div>
  );
}
