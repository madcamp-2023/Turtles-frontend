import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import "./LogoutBtn.css";

export default function LogoutBtn() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <IconButton onClick={handleLogoutClick} className="logout-button">
      <LogoutIcon sx={{ fontSize: 40 }} />
    </IconButton>
  );
}
