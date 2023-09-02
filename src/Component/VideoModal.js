import {
  Container,
  Box,
  Modal,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteVideo } from "../API/VideoAPI";

const VideoModal = ({ handleClose, videoData, handleLike }) => {
  const dispatch = useDispatch();
  const likedVideoList = useSelector((state) => state.likedVideoList);
  const loggedInUserName = useSelector((state) => state.userName);
  const [isLiked, setIsLiked] = useState(likedVideoList.includes(videoData.id));
  const deleteVideos = async () => {
    deleteVideo(videoData.id);
  };
  const handleLikeBtn = async () => {
    await handleLike(videoData.id, isLiked ? "Cancel" : "Like");
    if (isLiked) {
      dispatch({
        type: "SET_LIKED_VIDEO_LIST",
        likedVideoList: likedVideoList.filter((videoId) => {
          return videoId !== videoData.id;
        }),
      });
    } else {
      dispatch({
        type: "SET_LIKED_VIDEO_LIST",
        likedVideoList: likedVideoList.concat([videoData.id]),
      });
    }
    setIsLiked((isLiked) => {
      return !isLiked;
    });
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Container
        maxWidth="md"
        disableGutters={true}
        sx={{
          width: "70vw",
          height: "100vh",
          outline: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          {/* Player Area */}
          <Box
            sx={{
              width: "100%",
              height: "65vh",
              backgroundColor: "#000000",
            }}
          >
            <ReactPlayer
              url={videoData.videoUrl}
              volume={0.5}
              width="100%"
              height="100%"
              //playing={true}
              controls={true}
            />
          </Box>

          {/* Video Info */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#434343",
              boxSizing: "border-box",
              padding: "10px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {/* Profile Img */}
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/2.jpg"
              sx={{ width: "60px", height: "60px", margin: "10px" }}
            />

            {/* Video Info */}
            <Box
              sx={{
                flexGrow: 10,
                minWidth: "300px",
                overflow: "hidden",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
                margin: "10px",
              }}
            >
              {/* Title */}
              <Typography variant="h6">{videoData.title}</Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {/* Uploader Name */}
                <Typography variant="subtitle1">
                  {videoData.uploader}
                </Typography>

                {/* Watch & Like */}
                <Box sx={{ display: "flex", opacity: 0.75 }}>
                  <Typography variant="subtitle1" sx={{ marginRight: "20px" }}>
                    Watch : {videoData.watch}
                  </Typography>
                  <Typography variant="subtitle1">
                    Like : {videoData.like}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Like & Bookmark Btn */}
            <Box
              sx={{
                flexGrow: 1,
                width: "300px",
                overflow: "hidden",
                display: "flex",
                margin: "10px",
                ml: 0
              }}
            >
              {(loggedInUserName === videoData.uploader) && <Button
                startIcon = {<DeleteIcon />}
                variant="outlined"
                color="white"
                sx={{ overflow: "hidden", marginRight: "10px", flexGrow: 1 }}
                onClick={deleteVideos}
              >
                Delete
              </Button>}
              <Button
                variant="outlined"
                startIcon={isLiked ? <CheckIcon /> : <FavoriteIcon />}
                color="white"
                style={{ backgroundColor: isLiked ? "#737373" : null }}
                sx={{ overflow: "hidden", marginRight: "10px", flexGrow: 1 }}
                onClick={handleLikeBtn}
                disabled={loggedInUserName === "Guest"}
              >
                Like
              </Button>
              <Button
                startIcon = {<CloseIcon />}
                variant="outlined"
                color="white"
                sx={{ flexGrow: 1 }}
                onClick={handleClose}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default VideoModal;
