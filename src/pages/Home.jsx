import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Home.css"
import Sidebar from "../components/Sidebar";
import ToDo from "./ToDo";
import Social from "./Social";
import Alarm from "./Alarm";

function Home() {
  return (
    <div className="App">
      <div className="AppGlass">
          <Sidebar/>
          <Routes>
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/social" element={<Social />} />
          </Routes>
      </div>
    </div> 
  );
}

export default Home;
