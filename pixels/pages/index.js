import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import Status from "@/components/status";
import Creators from "@/components/creators";

const Home = () => {
  const [blue_color, setBlueColor] = useState({});
  const [green_color, setGreenColor] = useState({});
  const [creators, setCreators] = useState([]);
  const [rolloutStatus, setRolloutStatus] = useState(0);
  const [isRandomOn, setIsRandomOn] = useState(true);

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
        setRolloutStatus(0);
      }
    };

    let intervalId;
    if (isRandomOn) {
      intervalId = setInterval(() => {
        fetchData();
      }, 5000);
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
      }, 2000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [!isRandomOn]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
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
        {/* <Box></Box> */}
        <Box sx={{ mt: 20 }}>
          <Creators creators={creators} />
        </Box>
      </Box>
    </Container>
  );
};
export default Home;
