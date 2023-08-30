import {
  Box,
  Grid,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import VideoCard from "./VideoCard"
import { getVideoListApi, handleLikeApi } from '../API/VideoAPI';

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    getVideoList()
  }, [])

  const getVideoList = async() => {
    setVideoList(await getVideoListApi(setVideoList))
  }

  const handleLike = useCallback(async(targetVideoId, type="Like") => {
    // type == "Like"면 1, "Cancel"이면 -1, 둘다 이닌 경우 0
    const adjustVal = (type === "Like")?1:((type === "Cancel")?-1:0);

    const updateLike = await handleLikeApi(targetVideoId, adjustVal)

    setVideoList(videoList.map((video) => {
      if(video.id === targetVideoId){
        return {...video, like: updateLike}
      } else {
        return video
      }
    }))
    console.log(videoList)
  }, [videoList])

  return (
    <Box sx={{paddingBottom: "100px"}}>
      {/* Movie Cards */}
        <Grid container spacing={1} sx={{position: "relative", justifyContent: "center"}}>
            {videoList.map((videoData) => {
              return <VideoCard key={videoData.id} videoData={videoData} handleLike={handleLike} ></VideoCard>
            })}
        </Grid>
    </Box>
  );
}

export default VideoList;