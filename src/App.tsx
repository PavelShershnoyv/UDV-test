import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Room from "./components/Room/Room";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Auth />}></Route>
        <Route path="chat" element={<Room />}></Route>
      </Routes>
    </div>
  );
}

export default App;
