import { useEffect } from "react";

const useWebFontLoader = (font) => {
  useEffect(() => {
    if (!font) return;

    const WebFontLoader = require('webfontloader')
    WebFontLoader.load({
      google: {
        families: [font]
      }
    })
  }, [font]);
};

export default useWebFontLoader;
