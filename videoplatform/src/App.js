import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Mypage from "./Mypage";
import Navbar from "./Component/Navbar";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { likedVideoListUpdateApi } from './API/VideoAPI';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";

function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      userName: "Guest",
      likedVideoList: [],
    }
  }
  const newState = { ...currentState };
  if (action.type === 'LOGIN') {
    newState.userName = action.userName;
    newState.likedVideoList = action.likedVideoList
    console.log(newState)
  }
  else if (action.type === 'LOGOUT') {
    newState.userName = "Guest";
    newState.likedVideoList = []
    console.log(newState)
  }
  else if (action.type === 'SET_LIKED_VIDEO_LIST') {
    likedVideoListUpdateApi(action.likedVideoList, newState.userName)
    newState.likedVideoList = action.likedVideoList
    console.log(newState)
  }
  return newState;
}
const store = createStore(reducer);
export { store };
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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Mypage" element={<Mypage />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;
