import Container from '@mui/material/Container';
import React from 'react';
import MovieList from './Component/MovieList';


function App() {
  return (
    <Container maxWidth="lg" disableGutters={true} sx={{backgroundColor: "#D9D9D9"}}>
      <MovieList></MovieList>
    </Container>
  );
}

export default App
