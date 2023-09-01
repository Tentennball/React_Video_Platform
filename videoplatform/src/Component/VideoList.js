import {
  Box,
  Grid,
} from '@mui/material';

import VideoCard from "./VideoCard"

const VideoList = ({videoList, handleLike, handleWatch}) => {
  return (
    <Box sx={{paddingBottom: "100px"}}>
      {/* Movie Cards */}
        <Grid container spacing={1} sx={{position: "relative", justifyContent: "center"}}>
            {videoList.map((videoData) => {
              return <VideoCard key={videoData.id} videoData={videoData} handleLike={handleLike} handleWatch={handleWatch} ></VideoCard>
            })}
        </Grid>
    </Box>
  );
}

export default VideoList;