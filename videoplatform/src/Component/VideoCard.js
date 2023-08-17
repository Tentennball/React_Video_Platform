import {
  Grid, 
  Container,
  Box,
  Modal,
  Fade,
  Typography,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import { useState } from 'react';
import VideoInfoCard from './VideoInfoCard';

const VideoCard = () => {

  const [isMouseOn, setIsMouseOn] = useState(false)
  
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true)
  };
  const handleClose = () => {
    setIsOpen(false)
    setIsMouseOn(false)
  };


  return (
    /* Vedeo Img Card */
    <Grid item={true} xs sx={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "250px",
      maxWidth: "292px",
      height: "180px",
      backgroundImage: "url(/img/An.jpg)",
      backgroundSize: "cover",
      margin: "5px",
      padding: "0px",
      borderRadius: "10px"
    }}
      onMouseEnter={() => {setIsMouseOn(true)}}
      onMouseLeave={() => {setIsMouseOn(false)}}
    >
      {/* Vedeo Info Card */}
      {isMouseOn && <VideoInfoCard handleOpen={handleOpen}/>}

      {/* Vedeo Modal */}
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
            flexDirection: "column", 
            overflow: "hidden", 
            borderRadius: "10px"
          }}>
            <Box sx={{ 
              width: "100%", 
              height: "65vh", 
              backgroundColor: "white", 
            }}>
              Video
            </Box>
            <Box sx={{ 
              width: "100%", 
              height: "100px", 
              backgroundColor: "#585858", 
            }}>
              Title
            </Box>
          </Box>
        </Container>
      </Modal>
    </Grid>
  );
}

export default VideoCard;