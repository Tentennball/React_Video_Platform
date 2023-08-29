import {
  Grid, 
} from '@mui/material';
import { useEffect, useState } from 'react';
import VideoInfoCard from './VideoInfoCard';
import VideoModal from './VideoModal';

const VideoCard = (props) => {
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
      backgroundImage: `url(${props.videoData.thumbnailUrl})`,
      backgroundSize: "cover",
      margin: "5px",
      padding: "0px",
      borderRadius: "10px"
    }}
      onMouseEnter={() => {setIsMouseOn(true)}}
      onMouseLeave={() => {setIsMouseOn(false)}}
    >

      {/* Video Info Card */}
      {isMouseOn && <VideoInfoCard handleOpen={handleOpen} videoData={props.videoData}/>}

      {/* Video Modal */}
      {isOpen && <VideoModal handleClose={handleClose} videoData={props.videoData}/>}

    </Grid>
  );
}

export default VideoCard;