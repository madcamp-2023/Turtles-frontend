import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import FollowingModal from "./FollowingModal";

const UserProfile = ({ uid, github_id, name, profile_img, bio }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="following-profile-container" onClick={toggleModal}>
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
        <FollowingModal
          onClose={toggleModal}
          uid={uid}
          name={name}
        ></FollowingModal>
      )}
    </div>
  );
};

export default UserProfile;
