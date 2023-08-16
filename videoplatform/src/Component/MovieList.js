import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';

import MovieCard from './MovieCard';

const MovieList = () => {

  const [sortOption, setSortOption] = useState('');

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Box>
      {/* Movie List Text & Sort Btn bar */}
      <Box>
        <Typography variant="h5" gutterBottom >
          Video List
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Sort</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={sortOption}
            label="Sort"
            onChange={handleChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value={"Like"}>Like</MenuItem>
            <MenuItem value={"Most View"}>Most View</MenuItem>
            <MenuItem value={"Recently"}>Recently</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Movie Cards */}
        <Grid container spacing={1}>
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          

        </Grid>
    </Box>
  );
}

export default MovieList;