import { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import axios from "axios";
import Creators from "@/components/creators";
import PixelsGrid from "@/components/pixels-grid";
import Status from "@/components/status";

const GeneratePixelsGrid = (blue_counter, green_counter, random = false) => {
  const total = blue_counter + green_counter;
  const result = [];

  for (let i = 0; i < total; i++) {
    if (i < blue_counter) {
      result.push("b");
    } else {
      result.push("g");
    }
  }

  if (random) {
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
  }

  return result;
};

const Home = () => {
  const [blue_color, setBlueColor] = useState({});
  const [green_color, setGreenColor] = useState({});
  const [creators, setCreators] = useState([]);
  const [rolloutStatus, setRolloutStatus] = useState(0);
  const [isRandomOn, setIsRandomOn] = useState(true);
  const [pixelsOrder, setPixelsOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/blue");
        setBlueColor(response.data);
      } catch (error) {
        setBlueColor({ light_hexa: "#F24C4C", dark_hexa: "#D92027" });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/green");
        setGreenColor(response.data);
      } catch (error) {
        setGreenColor({ light_hexa: "#FAEAB1", dark_hexa: "#FFCD3C" });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/creators");
        setCreators(response.data);
      } catch (error) {
        setCreators([{ name: "Dani Almog", ssn: "123456789" }]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost/rollout-status/random"
        );
        setRolloutStatus(response.data.status);
      } catch (error) {
        setRolloutStatus(Math.floor(Math.random() * 100));
      }
    };

    let intervalId;
    if (isRandomOn) {
      intervalId = setInterval(() => {
        fetchData();
      }, 6000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRandomOn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/rollout-status/status"
        );
        setRolloutStatus(response.data.status);
      } catch (error) {
        setRolloutStatus(0);
      }
    };

    let intervalId;
    if (!isRandomOn) {
      intervalId = setInterval(() => {
        fetchData();
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [!isRandomOn]);

  useEffect(() => {
    setPixelsOrder(
      GeneratePixelsGrid(100 - rolloutStatus, rolloutStatus, isRandomOn)
    );
  }, [rolloutStatus]);

  const handleClick = () => {
    try {
      axios.post("http://localhost/rollout-status/rollout");
      setIsRandomOn(false);
      setRolloutStatus(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Status status={rolloutStatus} />
        </Box>
        {blue_color !== null && green_color !== null && pixelsOrder !== [] && (
          <Box sx={{ mt: 5 }}>
            <PixelsGrid
              blue_color={blue_color}
              green_color={green_color}
              pixels_order={pixelsOrder}
            />
          </Box>
        )}
        <Box sx={{ mt: 5 }}>
          <Button variant="contained" onClick={handleClick}>
            Deploy
          </Button>
        </Box>
        <Box sx={{ mt: 6 }}>
          <Creators creators={creators} />
        </Box>
      </Box>
    </Container>
  );
};
export default Home;
