import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
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
        const response = await fetch("http://localhost/blue");
        const json = await response.json();
        setBlueColor(json);
      } catch (error) {
        setBlueColor({ light_hexa: "#F24C4C", dark_hexa: "#D92027" });
      }
      fetchData();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/green");
        const json = await response.json();
        setGreenColor(json.data);
      } catch (error) {
        setGreenColor({ light_hexa: "#FAEAB1", dark_hexa: "#FFCD3C" });
      }
      fetchData();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/creators");
        const json = await response.json();
        setCreators(json);
      } catch (error) {
        setCreators([{ name: "Dani Almog", ssn: "123456789" }]);
      }
      fetchData();
    };
  }, []);

  // useEffect(() => {
  //   let intervalId;
  //   if (isRandomOn) {
  //     intervalId = setInterval(() => {
  //       fetch("http://localhost/rollout-status/random")
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setRolloutStatus(data.status);
  //           console.log(data);
  //         });
  //     }, 5000);
  //   }

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [isRandomOn]);

  // useEffect(() => {
  //   let intervalId;
  //   if (!isRandomOn) {
  //     intervalId = setInterval(() => {
  //       fetch("http://localhost/rollout-status/status")
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setRolloutStatus(data.status);
  //           console.log(data);
  //         });
  //     }, 2000);
  //   }

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [!isRandomOn]);

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
        <Box>
          <Creators creators={creators} />
        </Box>
      </Box>
    </Container>
  );
};
export default Home;
