"use client";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ImageSizes({ size, setSize, setDisplaySize, IMAGE_SIZES }) {
  const handleSize = (e) => {
    const newSize = JSON.parse(e.target.value);
    setSize(newSize);
    setDisplaySize({ w: newSize.w / 2, h: newSize.h / 2 });
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="select-size">Image Size</InputLabel>
        <Select
          labelId="select-size"
          id="select-size"
          value={JSON.stringify(size)}
          label="Image Size"
          onChange={handleSize}
        >
          {IMAGE_SIZES.map((sizeOption, index) => (
            <MenuItem key={index} value={JSON.stringify(sizeOption)}>
              {sizeOption.w}x{sizeOption.h}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
