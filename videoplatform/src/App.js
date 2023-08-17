import Container from '@mui/material/Container';
import React from 'react';
import VideoList from './Component/VideoList';

function App() {
  return (
    <Container maxWidth="lg" disableGutters={true} sx={{backgroundColor: "#1F1F1F"}}>
      <VideoList></VideoList>
    </Container>
  );
}

export default App
