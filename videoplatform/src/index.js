import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Mypage from './Component/Mypage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Mypage" element={<Mypage/>}/>
    </Routes>
  </BrowserRouter>
);
