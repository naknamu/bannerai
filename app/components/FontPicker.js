"use client";

import React, { useState, useEffect } from "react";
import { getFontFamilies } from "../actions";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from '@mui/material/NativeSelect';

const FontPicker = ({ selectedFont, setSelectedFont }) => {
  const [fonts, setFonts] = useState(["Roboto"]);

  useEffect(() => {
    const fetchFonts = async () => {
      const fontFamilies = await getFontFamilies();

      setFonts(fontFamilies);
      setSelectedFont(fontFamilies[0]);
    };

    fetchFonts();
  }, [setSelectedFont]);

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="font-family-select">Font Family</InputLabel>
        <NativeSelect
          value={selectedFont}
          label="Font Family"
          onChange={(e) => setSelectedFont(e.target.value)}
          // style={{ fontFamily: selectedFont }}
        >
          {fonts.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default FontPicker;
