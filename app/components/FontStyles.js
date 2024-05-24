import Stack from "@mui/material/Stack";
import { ColorPicker } from "./ColorPicker";
import FontPicker from "./FontPicker";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

export default function FontStyles({
  color,
  selectedFont,
  fontSize,
  setColor,
  setFontSize,
  setSelectedFont,
  setBoldText,
  setItalicText,
}) {
  const [boldBgColor, setBoldBgColor] = useState("white");
  const [italicBgColor, setItalicBgColor] = useState("white");

  const handleBoldClick = () => {
    setBoldBgColor((prevColor) =>
      prevColor === "white" ? "lightgray" : "white"
    );
    setBoldText((prevBold) => (prevBold === "" ? "bold" : ""));
  };

  const handleItalicClick = () => {
    setItalicBgColor((prevColor) =>
      prevColor === "white" ? "lightgray" : "white"
    );
    setItalicText((prevItalic) => (prevItalic === "" ? "italic" : ""));
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <h4>Font Style: </h4>
        <Tooltip title="Text Color">
          <Box>
            <ColorPicker color={color} onChange={setColor} />
          </Box>
        </Tooltip>
        <Box>
          <FontPicker
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
          />
        </Box>
        <TextField
          label="font size (px)"
          variant="standard"
          onChange={(e) => setFontSize(e.target.value)}
          type="number"
          defaultValue={fontSize}
        />
        <Tooltip title="Bold">
          <Box
            onClick={handleBoldClick}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: boldBgColor,
              "&:hover": {
                boldBgColor: "lightgray",
              },
            }}
          >
            <FormatBoldIcon />
          </Box>
        </Tooltip>
        <Tooltip title="Italic">
          <Box
            onClick={handleItalicClick}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: italicBgColor,
              "&:hover": {
                italicBgColor: "lightgray",
              },
            }}
          >
            <FormatItalicIcon />
          </Box>
        </Tooltip>
      </Stack>
    </>
  );
}
