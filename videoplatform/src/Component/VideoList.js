import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';

import VideoCard from './VideoCard';

const VideoList = () => {

  const [sortOption, setSortOption] = useState('');

  const handleChange = (event) => {
    setSortOption(event.target.value);
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
        <FormControl sx={{ m: 1, minWidth: 120,}} size="small">
          <InputLabel id="demo-select-small-label" sx={{color: "#FFFFFF"}}>Sort</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={sortOption}
            label="Sort"
            onChange={handleChange}
          >
            <MenuItem value={"Like"}>Like</MenuItem>
            <MenuItem value={"Most View"}>Most View</MenuItem>
            <MenuItem value={"Recently"}>Recently</MenuItem>
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