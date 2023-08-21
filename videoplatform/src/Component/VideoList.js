import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import VideoCard from "./VideoCard"

const VideoList = () => {

  const [sortOption, setSortOption] = useState('');

  useState(() => {
    setSortOption("Recently")
  }, [])

  const handleChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <Box sx={{paddingBottom: "100px"}}>
      {/* Movie List Text & Sort Btn bar */}
      <Box sx={{ 
        position: "relative", 
        height: "75px", 
        marginBottom: "30px",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"
      }}>
        <Typography variant="h5" sx={{color: "#FFFFFF"}}>
          Video List
        </Typography>
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

      {/* Movie Cards */}
        <Grid container spacing={1} sx={{position: "relative", justifyContent: "center"}}>
          <VideoCard></VideoCard>
          <VideoCard></VideoCard>
          <VideoCard></VideoCard>
          <VideoCard></VideoCard>
          <VideoCard></VideoCard>
          <VideoCard></VideoCard>
          <VideoCard></VideoCard>
          <VideoCard></VideoCard>
        </Grid>
    </Box>
  );
}

export default VideoList;