import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import VideoList from './VideoList';
import { getVideoListApi, getUserVideoListApi, handleLikeApi, handleWatchApi } from '../API/VideoAPI';
import { useSelector } from "react-redux";

const VideoListViewer = ({viewerTitle, type}) => {
  const [sortOption, setSortOption] = useState('');
  const [videoList, setVideoList] = useState([]);
  const userName = useSelector((state) => state.userName);

  const handleChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    setSortOption("Recently");
  }, [])

  useEffect(() => {
    const getVideoList = async() => {
      if (type === "MyPage") {
        setVideoList(await getUserVideoListApi(userName, sortOption))
      } else {
        setVideoList(await getVideoListApi(sortOption))
      }
    }
    if(sortOption){
      getVideoList()      
    }
  }, [sortOption, type, userName])


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
      <Box sx={{ 
        position: "relative", 
        height: "75px", 
        marginBottom: "30px",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"
      }}>
        {/* Video List Text */}
        <Typography variant="h5" sx={{color: "#FFFFFF"}}>
          {viewerTitle}
        </Typography>

        {/* Sort Btn bar */}
        <FormControl size="small" color='white' sx={{
            minWidth: 120, 
            "& > div:hover > fieldset": {borderColor: "#FFFFFF !important"}
        }}>
          <InputLabel id="sort-option-label" sx={{color: "#FFFFFF"}}>Sort</InputLabel>
          <Select
            labelId="sort-option-label"
            id="sort-option"
            value={sortOption}
            label="Sort"
            onChange={handleChange}
            sx={{
              color: "#FFFFFF",
              "& svg": {
                color: "#FFFFFF"
              },
              "& fieldset": {
                borderWidth: "1px",
                borderColor: "#B0B0B0",
              },
            }}
          >
            <MenuItem value={"Recently"}>Recently</MenuItem>
            <MenuItem value={"Like"}>Like</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <VideoList type={type} videoList={videoList} handleLike={handleLike} handleWatch={handleWatch}></VideoList>

    </Box>
  );
}

export default VideoListViewer;