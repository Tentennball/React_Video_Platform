import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { getUserVideoList } from "./API/VideoAPI";
import { useState, useEffect } from "react";
import VideoCard from "./Component/VideoCard";
import Navbar from "./Component/Navbar";
import { store } from "./App";
import { Provider, useSelector } from "react-redux";
const Mypage = () => {
  const [videoList, setVideoList] = useState([]);
  //const userName = useSelector((state) => state.userName);
  useEffect(() => {
    getUserVideoList(setVideoList, /*userName*/);//이거 useSelector해서 props에 userName 추가해도 안됨
  },[]);

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
