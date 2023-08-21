import {
  Grid, 
} from '@mui/material';
import { useState } from 'react';
import VideoInfoCard from './VideoInfoCard';
import VideoModal from './VideoModal';

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
      maxWidth: "300px",
      aspectRatio: "16 / 9",
      /* Image Path */
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
      {isOpen && <VideoModal handleClose={handleClose}/>}

    </Grid>
  );
}

export default VideoCard;