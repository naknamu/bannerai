"use client";

import React, { useState, useEffect } from "react";
import { getFontFamilies } from "../actions";
import Script from "next/script";

const FontPicker = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");

  console.log(selectedFont);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const fontFamilies = await getFontFamilies();
        setFonts(fontFamilies);
        setSelectedFont(fontFamilies[0]); // Set initial font to the first one in the list
      } catch (error) {
        console.error("Error fetching fonts:", error);
      }
    };

    fetchFonts();
  }, []);

  useEffect(() => {
    if (!selectedFont) return;

    const loadFont = () => {
      if (window.WebFont) {
        window.WebFont.load({
          google: {
            families: [selectedFont],
          },
        });
      }
    };

    loadFont();
  }, [selectedFont]);


  return (
    <div>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
        onLoad={() => console.log('WebFontLoader script loaded')}
      />
      <h1>Font Picker</h1>
      <select
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
      >
        {fonts.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
      <p style={{ fontFamily: selectedFont, fontSize: "24px" }}>
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>
  );
};

export default FontPicker;
