import React, { useState, useEffect } from "react";
import "./UserProfile.css";

// UserProfile 컴포넌트
const UserProfile = ({ uid, github_id, name, profile_img, bio }) => {
  return (
    <div className="user-profile">
      <div className="profile-picture">
        <img src={profile_img} alt={`${name}'s profile`} />
      </div>
      <div className="user-info-container">
        <div className="user-info">{name}</div>
        <div className="user-id">@{github_id}</div>
        <div className="user-bio">{bio}</div>
      </div>
    </div>
  );
};

export default UserProfile;
