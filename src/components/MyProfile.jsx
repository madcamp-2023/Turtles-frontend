import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import BioModal from "./BioModal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const MyProfile = () => {
  const github_id = localStorage.getItem("github_id");
  const name = localStorage.getItem("name");
  const profile_img = localStorage.getItem("profile_img");
  const bio = localStorage.getItem("bio");

  const [userData, setUserData] = useState({
    profilePicture: profile_img,
    name: name,
    id: github_id,
    bio: bio,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateBio = async (newBio) => {
    setUserData((prevState) => ({
      ...prevState,
      bio: newBio,
    }));

    localStorage.setItem("bio", newBio);
    const localPort = process.env.REACT_APP_LOCAL_PORT;
    const uid = localStorage.getItem("uid");
    const requestBody = {
      uid: uid,
      bio: newBio,
    };
    try {
      const response = await fetch(`${localPort}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("POST response:", data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="my-profile-container">
      <div className="my-profile">
        <div className="my-info-top">
          <div className="profile-picture">
            <img
              src={userData.profilePicture}
              alt={`${userData.name}'s profile`}
            />
          </div>
          <div className="my-info-container">
            <div className="my-info">{userData.name}</div>
            <Typography variant="h6" gutterBottom className="my-id">
              @{userData.id}
            </Typography>
          </div>
        </div>
        <Stack direction="row" className="my-bio-container">
          <div className="my-bio">{userData.bio}</div>
          <IconButton aria-label="edit" onClick={handleClick}>
            <EditIcon />
          </IconButton>
        </Stack>
      </div>
      {isModalOpen && (
          <BioModal
            onClose={handleCloseModal}
            onUpdateBio={handleUpdateBio}
          ></BioModal>
        )}
    </div>
  );
};

export default MyProfile;
