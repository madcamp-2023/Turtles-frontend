//UserProfile.jsx
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import FollowingModal from "./FollowingModal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// UserProfile 컴포넌트
const UserProfile = ({ uid, github_id, name, profile_img, bio }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달 토글 함수
  const toggleModal = () => {
    setModalOpen(true);
  };

  
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="user-profile-container" onClick={toggleModal}>
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
      {isModalOpen && (
        <FollowingModal onClose={handleCloseModal} uid={uid}></FollowingModal>
        )}
    </div>
  );
};

export default UserProfile;
