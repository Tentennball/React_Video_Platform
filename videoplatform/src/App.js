import Container from '@mui/material/Container';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VideoList from './Component/VideoList';
import Navbar from './Navbar';

const theme = createTheme({
  palette: {
    white: {
      main: "#ffffff"
    }
  }
});



function App() {
  return (
    <ThemeProvider theme={theme}>
    <Navbar/>
    <Container maxWidth="lg"  sx={{backgroundColor: "#1F1F1F"}}>
      <VideoList></VideoList>
    </Container>
    </ThemeProvider>
  );
}

export default App;

