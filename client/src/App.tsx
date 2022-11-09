import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import { Home } from "./page";
import CustomerOptions from "./page/CustomerOptions";
import CustomerRequestList from "./page/CustomerRequestList";
import CounselorRequestList from "./page/CounselorRequestList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/customerOptions" element={<CustomerOptions />}></Route>
        <Route
          path="/lookupWrittenRequests"
          element={<CustomerRequestList />}
        ></Route>
        <Route
          path="/lookupNewRequests"
          element={<CounselorRequestList />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
