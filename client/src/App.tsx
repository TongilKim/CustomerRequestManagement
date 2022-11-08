import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import { Home } from "./page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
