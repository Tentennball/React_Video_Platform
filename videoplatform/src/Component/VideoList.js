import {
  Box,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import VideoCard from "./VideoCard"

import { getVideoList } from '../API/VideoAPI';

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    getVideoList(setVideoList);
  }, [])

  const handleLike = (videoId) => {
    videoList.map((video) => {
      if(video.id == videoId){}
    })
  }

  return (
    <Box sx={{paddingBottom: "100px"}}>
      {/* Movie Cards */}
        <Grid container spacing={1} sx={{position: "relative", justifyContent: "center"}}>
            {videoList.map((videoData) => {
              return <VideoCard key={videoData.id} videoData={videoData}></VideoCard>
            })}
        </Grid>
    </Box>
  );
}

export default VideoList;