import { useState, useEffect } from "react";
import { Box } from "@mui/material";

export const Pixel = (props) => {
  const { light_hexa, dark_hexa } = props;
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["#DDDDDD", light_hexa, dark_hexa];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => {
        return (prevIndex + 1) % colors.length;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      sx={{
        width: 42,
        height: 42,
        bgcolor: colors[colorIndex],
        borderRadius: 1,
        transition: "background-color 1s ease-in-out",
      }}
    />
  );
};

export default Pixel;
