import Container from "@mui/material/Container";
import VideoListViewer from "./Component/VideoListViewer";

const Mypage = () => {
  return (
      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "#1F1F1F", marginTop: "4rem" }}
      >
        <VideoListViewer viewerTitle={"Uploaded Video"} type={"MyPage"}/>
      </Container>
  );
};

export default Mypage;
