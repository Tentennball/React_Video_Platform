import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { getVideoList } from "../API/VideoAPI";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import Navbar from "./Navbar";
import { store } from "../App";
import { Provider } from "react-redux";
const Mypage = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    getVideoList(setVideoList);
  }, []);

  return (
    <Provider store={store}>
      <Navbar/>
      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "#1F1F1F", marginTop: "4rem" }}
      >
        <Box
          sx={{
            pposition: "relative",
            justifyContent: "center",
            display: "flex", // Add this line
            flexWrap: "wrap",
          }}
        >
          {videoList.map((videoData) => {
            return (
              <VideoCard key={videoData.id} videoData={videoData}></VideoCard>
            );
          })}
        </Box>
      </Container>
    </Provider>
  );
};

export default Mypage;
