import { Container } from "@mui/system";
import VideoListViewer from "./Component/VideoListViewer";

const MainPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: "#1F1F1F", marginTop: "4rem" }}
    >
      <VideoListViewer viewerTitle={"Video List"} type={"MainPage"}/>
    </Container>
  );
}

export default MainPage;