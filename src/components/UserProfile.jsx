import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// UserProfile 컴포넌트
const UserProfile = ({ github_id, name, profile_img, bio }) => {
  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <div className="user-upper">
          <div className="profile-picture">
            <img src={profile_img} alt={`${name}'s profile`} />
          </div>
          <div className="user-info">
            <div className="user-name">{name}</div>
            <div className="user-id">@{github_id}</div>
          </div>
        </div>
        <div className="user-bio-container">
          <div className="user-bio">{bio}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
