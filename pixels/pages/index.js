import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { Pixel } from "../components/pixel";

const blue_color = {
  light_hexa: "#2684FC",
  dark_hexa: "#0066DA",
};

const green_color = {
  light_hexa: "#00AC47",
  dark_hexa: "#00832D",
};

function GeneratePixelsGrid(
  blue_counter,
  green_counter,
  blue_color,
  green_color,
  random = false
) {
  const total = blue_counter + green_counter;
  const result = [];

  for (let i = 0; i < total; i++) {
    if (i < blue_counter) {
      result.push(<Pixel {...blue_color} />);
    } else {
      result.push(<Pixel {...green_color} />);
    }
  }

  if (random) {
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
  }

  return result;
}

const Home = () => {
  const [isRandomOn, setIsRandomOn] = useState(true);
  const [pixels, setPixels] = useState(
    GeneratePixelsGrid(3, 2, blue_color, green_color, true)
  );

  useEffect(() => {
    let intervalId;
    if (isRandomOn) {
      intervalId = setInterval(() => {
        setPixels(GeneratePixelsGrid(3, 2, blue_color, green_color, true));
      }, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRandomOn]);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {pixels}
      </Container>
    </>
  );
};

export default Home;
