import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import { Home } from "./page";
import CustomerOptions from "./page/CustomerOptions";
import UserRequestList from "./page/UserRequestList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/customerOptions" element={<CustomerOptions />}></Route>
        <Route
          path="/lookupWrittenRequests"
          element={<UserRequestList />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
