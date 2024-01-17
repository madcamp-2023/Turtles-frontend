import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./Home.css";
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
    <div className="App">
      <div className="AppGlass">
        <AllInOne />
      </div>
    </div>
  );
}

export default Home;
