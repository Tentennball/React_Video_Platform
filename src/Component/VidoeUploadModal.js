import {
  Container,
  Box,
  Modal,
  Typography,
  Button,
  Input,
  LinearProgress
} from "@mui/material";
import { useState } from "react";
import { FileUpload } from "../API/FileUploadAPI";
import { uploadVideoDataApi } from "../API/VideoAPI";
import { useSelector } from "react-redux";

const VideoUploadModal = (props) => {
  const [videoProgress, setVideoProgress] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [thumbProgress, setThumbProgress] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const userName = useSelector((state) => state.userName);
  // Handler
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleClose = () => {
    if (!isUploading) {
      props.handleClose();
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const timeStamp = new Date().getTime().toString();

    // File Upload & get FileUrl
    const videoUrl = await FileUpload(
      "Video",
      videoFile,
      timeStamp,
      setVideoProgress,
    ).catch((e) => {
      console.error(e);
      alert("Video File Upload Fail");
      setIsUploading(false);
      return null;
    });
    const thumbnailUrl = await FileUpload(
      "Thumbnail",
      thumbnailFile,
      timeStamp,
      setThumbProgress
    ).catch((e) => {
      console.error(e);
      alert("Thumbnail File Upload Fail");
      return null;
    });

    if (!(videoUrl && thumbnailFile)) {
      return;
    }

    // Create Video Data & Data Upload
    const VideoData = {
      id: timeStamp,
      title: title,
      videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl,
      uploader: userName,
      like: 0,
      watch: 0,
    };
    await uploadVideoDataApi(VideoData);

    setIsUploading(false);
    
    alert("Upload Finish");
    props.handleClose();
    window.location.reload();
  };

  return (
    <Modal open={props.isOpen} onClose={handleClose}>
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
            //height: "70vh",
            backgroundColor: "#585858",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          {/* Title */}
          <Typography variant="h5" gutterBottom sx={{ color: "#FFFFFF" }}>
            Video Title
          </Typography>
          <Box sx={{ color: "#FFFFFF" }}>
            <Input
              fullWidth
              color="white"
              onChange={handleTitleChange}
              disabled={isUploading}
              placeholder="Input Title"
              sx={{
                color: "white !important",
                display: "block",
                marginBottom: "20px",
              }}
            />

            {/* Video File */}
            <Typography variant="h5" gutterBottom sx={{ color: "#FFFFFF" }}>
              Video File
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <Button
                variant="contained"
                color="darkGray"
                sx={{ padding: "0px" }}
                disabled={isUploading}
              >
                <label
                  htmlFor="video_upload_input"
                  style={{ minWidth: "200px", padding: "5px 0px" }}
                >
                  <Typography variant="button" sx={{ cursor: "pointer" }}>
                    Video Select
                  </Typography>
                </label>
                <input
                  id="video_upload_input"
                  name="Video"
                  type="file"
                  accept="video/mp4"
                  onChange={handleVideoFileChange}
                  style={{ display: "none" }}
                />
              </Button>
              <Typography
                gutterBottom
                variant="subtitle1"
                sx={{ margin: "0px 0px 0px 10px" }}
              >
                {videoFile ? videoFile.name : "Please Select File..."}
              </Typography>
            </Box>

            {/* Thumbnail File */}
            <Typography variant="h5" gutterBottom sx={{ color: "#FFFFFF" }}>
              Thumbnail File
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <Button
                variant="contained"
                color="darkGray"
                sx={{ padding: "0px" }}
                disabled={isUploading}
              >
                <label
                  htmlFor="thumbnail_upload_input"
                  style={{ minWidth: "200px", padding: "5px 0px" }}
                >
                  <Typography variant="button" sx={{ cursor: "pointer" }}>
                    Thumbnail Select
                  </Typography>
                </label>
                <input
                  id="thumbnail_upload_input"
                  name="Thumbnail"
                  type="file"
                  accept="image/jpg, image/png"
                  onChange={handleThumbnailChange}
                  style={{ display: "none" }}
                />
              </Button>
              <Typography
                gutterBottom
                variant="subtitle1"
                sx={{ margin: "0px 0px 0px 10px" }}
              >
                {thumbnailFile ? thumbnailFile.name : "Please Select File..."}
              </Typography>
            </Box>
            

            {isUploading && <Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" color="white" value={videoProgress} 
              sx={{
                "& > span" : {
                  backgroundColor: "#1F1F1F"
                },
                marginBottom: "20px"
              }}/>
            </Box>}


          
            {/* Upload Button */}
            <Box sx={{display: "flex"}}>
              <Button
                onClick={handleUpload}
                variant="contained"
                color="darkGray"
                fullWidth
                disabled={!(title && thumbnailFile && videoFile && !isUploading)}
                sx={{ padding: "5px 0px", marginRight: "5px" }}
              >
                Upload
              </Button>

              <Button
                onClick={handleClose}
                variant="contained"
                color="darkGray"
                fullWidth
                disabled={isUploading}
                sx={{ padding: "5px 0px", marginLeft: "5px" }}
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

export default VideoUploadModal;
