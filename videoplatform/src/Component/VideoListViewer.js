import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import VideoList from './VideoList';

const VideoListViewer = () => {
  const [sortOption, setSortOption] = useState('');

  const handleChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    setSortOption("Recently");
  }, [])

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
          Video List
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
            <MenuItem value={"Most View"}>Most View</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <VideoList></VideoList>

    </Box>
  );
}

export default VideoListViewer;