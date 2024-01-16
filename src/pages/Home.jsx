import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./Home.css";
import Sidebar from "../components/Sidebar";
import ToDo from "./ToDo";
import Social from "./Social";
import Alarm from "./Alarm";
import AllInOne from "./AllInOne";

function Home() {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (!uid) {
      // Navigate to the Login page if uid is undefined
      navigate("/login");
    }
  }, [uid, navigate]);

  return (
    // <div className="App">
    //   <div className="AppGlass">
    //     <Sidebar />
    //     <Routes>
    //       <Route path="/alarm" element={<Alarm />} />
    //       <Route path="/todo" element={<ToDo />} />
    //       <Route path="/social" element={<Social />} />
    //     </Routes>
    //   </div>
    // </div>
    <div className="App">
      <AllInOne />
    </div>
  );
}

export default Home;
