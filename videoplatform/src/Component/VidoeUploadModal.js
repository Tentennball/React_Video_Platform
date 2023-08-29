import {
  Container,
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Input,
  Alert
} from '@mui/material';
import { useState } from 'react';
import { FileUpload } from '../API/FileUploadAPI';
import { uploadVideoData } from "../API/VideoAPI"


const VideoUploadModal = ({ isOpen, handleClose }) => {
  const [videoFile, setVideoFile] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [title, setTitle] = useState(null)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0])
  }

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0])
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    //const videoUrl = await FileUpload("Video", videoFile)
    const thumbnailUrl = await FileUpload("Thumbnail", thumbnailFile)


    const VideoData = {
      id: new Date().getTime().toString(),
      title: title,
      //videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl,
      uploder: "test_Uploader",
      like: 0,
      watch: 0
    }
    console.log(VideoData)
    //uploadVideoData(VideoData)
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Container maxWidth="md"
        disableGutters={true}
        sx={{
          width: "70vw",
          height: "100vh",
          outline: "none",
          display: "flex",
          alignItems: "center"
        }}>
        <Box sx={{
          width: "100%",
          height: "70vh",
          backgroundColor: "#585858",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "10px",
          padding: "40px 20px",
        }}>

          <Typography variant="h5" gutterBottom sx={{ color: "#FFFFFF" }}>
            Video Title
          </Typography>
          <Box sx={{ color: "#FFFFFF" }}>
            <Input
              fullWidth
              color='white'
              onChange={handleTitleChange}
              sx={{
                color: "white !important",
                display: "block",
                marginBottom: "20px"
              }}
            />

            {/* <Typography variant="h5" gutterBottom sx={{ color: "#FFFFFF" }}>
              Video File
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden", marginBottom: "20px" }}>
              <Button variant="contained" color='darkGray' sx={{ padding: "0px", }}>
                <label htmlFor="video_upload_input" style={{ padding: "5px 25px" }}>
                  <Typography variant="button">Video Select</Typography>
                </label>
                <input id='video_upload_input' name="Video" type="file" accept="video/mp4" onChange={handleVideoFileChange} style={{ display: "none" }} />
              </Button>
              <Typography gutterBottom variant="subtitle1" sx={{ margin: "0px 0px 0px 10px" }}>
                {videoFile ? videoFile.name : "Please Select File..."}
              </Typography>
            </Box> */}

            <Typography variant="h5" gutterBottom sx={{ color: "#FFFFFF" }}>
              Thumbnail File
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden", marginBottom: "20px" }}>
              <Button variant="contained" color='darkGray' sx={{ padding: "0px", }}>
                <label htmlFor="thumbnail_upload_input" style={{ padding: "5px 25px" }}>
                  <Typography variant="button">Thumbnail Select</Typography>
                </label>
                <input id='thumbnail_upload_input' name="Thumbnail" type="file" accept="image/jpg, image/png" onChange={handleThumbnailChange} style={{ display: "none" }} />
              </Button>
              <Typography gutterBottom variant="subtitle1" sx={{ margin: "0px 0px 0px 10px" }}>
                {thumbnailFile ? thumbnailFile.name : "Please Select File..."}
              </Typography>
            </Box>

            <Button onClick={handleSubmit}>Upload</Button>

          </Box>
        </Box>
      </Container>
    </Modal>
  );
}

export default VideoUploadModal;