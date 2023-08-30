import Container from "@mui/material/Container";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Component/Navbar";
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import VideoListViewer from "./Component/VideoListViewer";

function reducer(currentState, action){
  if(currentState===undefined){
    return {
      userName: "Guest",
      likedVideoList: [],
    }
  }
  const newState = {...currentState};
  if(action.type==='LOGIN'){
    newState.userName = action.userName;
    newState.likedVideoList = action.likedVideoList
    console.log(newState)
  } 
  else if(action.type==='LOGOUT'){
    newState.userName = "Guest";
    newState.likedVideoList = []
    console.log(newState)
  } 
  else if (action.type==='SET_LIKED_VIDEO_LIST'){
    newState.likedVideoList = action.likedVideoList
    console.log(newState)
  }
  return newState;
}
const store = createStore(reducer);
export {store};
const theme = createTheme({
  palette: {
    white: {
      main: "#ffffff",
    },
    darkGray: {
      main: "#1F1F1F"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "#1F1F1F", marginTop: "4rem" }}
      >
        <VideoListViewer />
      </Container>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
