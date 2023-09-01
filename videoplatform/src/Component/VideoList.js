import {
  Box,
  Grid,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import VideoCard from "./VideoCard"
import { getVideoListApi, getUserVideoListApi, handleLikeApi, handleWatchApi } from '../API/VideoAPI';
import { useSelector } from "react-redux";

const VideoList = ({type}) => {
  const [videoList, setVideoList] = useState([]);
  const userName = useSelector((state) => state.userName);

  useEffect(() => {
    getVideoList()
  },[])

  const getVideoList = async() => {
    if (type === "MyPage") {
      setVideoList(await getUserVideoListApi(userName))
    } else {
      setVideoList(await getVideoListApi())
    }
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
  }, [videoList])

  const handleWatch = useCallback(async(targetVideoId) => {
    const updateWatch = await handleWatchApi(targetVideoId)
    setVideoList(videoList.map((video) => {
      if(video.id === targetVideoId){
        return {...video, watch: updateWatch}
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
              return <VideoCard key={videoData.id} videoData={videoData} handleLike={handleLike} handleWatch={handleWatch} ></VideoCard>
            })}
        </Grid>
    </Box>
  );
}

export default VideoList;