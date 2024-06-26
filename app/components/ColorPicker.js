import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import style from "./ColorPicker.module.css"

import useClickOutside from "@/app/library/hooks/useClickOutside";

export const ColorPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className={style.picker}>
      <div
        className={style.swatch}
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className={style.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
