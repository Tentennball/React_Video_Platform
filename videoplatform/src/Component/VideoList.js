import {
  Box,
  Grid,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import VideoCard from "./VideoCard"
import { getVideoListApi, handleLikeApi } from '../API/VideoAPI';
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { store } from "../firebase";

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    getVideoList()
  }, [])

  const getVideoList = async() => {
    setVideoList(await getVideoListApi(setVideoList).
      catch((e) => { console.error(e); alert("Get List Fail"); })
    )
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

    // const [liked, setLiked] = useState(false);
    // const likeToggle = async () => {
    //   setLiked((prevLiked) => !prevLiked);
    // };
    
    // useEffect(() => {
    //   const updateLike = async () => {
    //     const like = doc(store, "VideoList", videoData.id);
    //     console.log(liked);
    
    //     if (!liked) {
    //       await updateDoc(like, { like: videoData.like + 1 });
    //       videoData.like++;
    //     } else {
    //       await updateDoc(like, { like: videoData.like - 1 });
    //       videoData.like--;
    //     }
    //   };
    
    //   updateLike();
    // }, [liked, videoData.like, videoData.id]);

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