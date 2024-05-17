import React, { useCallback, useRef, useState } from "react";
import style from "./Draggable.module.css";

export default function Draggable({ content }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const onMouseDown = useCallback(
    (event) => {
      const onMouseMove = (event) => {
        position.x += event.movementX;
        position.y += event.movementY;
        const element = elementRef.current;
        if (element) {
          element.style.transform = `translate(${position.x}px, ${position.y}px)`;
        }
        setPosition(position);
      };
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [position, setPosition, elementRef]
  );

  return (
    <div className={style.container}>
      <div className={style.draggableItem} ref={elementRef} onMouseDown={onMouseDown}>
        {content}
      </div>
    </div>
  );
};