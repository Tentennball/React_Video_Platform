import Container from '@mui/material/Container';
import React from 'react';

import VideoList from './Component/VideoList';
import Navbar from './Navbar';
function App() {
  return (
    <div>
    <Navbar/>
    <Container maxWidth="lg" disableGutters={true} sx={{backgroundColor: "#1F1F1F"}}>
      <VideoList></VideoList>
    </Container>
    </div>
  );
}

export default App;

