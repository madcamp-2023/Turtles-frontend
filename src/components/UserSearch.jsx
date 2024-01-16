import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./UserSearch.css";

export default function UserSearch({
  github_id,
  name,
  profile_img,
  bio,
  isFollowing,
  onUpdate,
}) {
  const localPort = process.env.REACT_APP_LOCAL_PORT;
  const [isFollowDisabled, setIsFollowDisabled] = useState(isFollowing);
  const myUid = localStorage.getItem("uid");

  useEffect(() => {
    const followUser = async () => {
      try {
        const response = await fetch(`${localPort}/friend`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: myUid,
            idOfFriend: github_id,
          }),
        });

        if (!response.ok) {
          console.error("Follow request failed");
        }
      } catch (error) {
        console.error("Error in follow:", error);
      }
    };

    if (isFollowDisabled) {
      followUser();
    }
  }, [isFollowDisabled]);

  const onFollow = () => {
    // Disable the button while the request is being made
    onUpdate();
    setIsFollowDisabled(true);
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <div className="user-upper">
          <div className="profile-picture">
            <img src={profile_img} alt={`${name}'s profile`} />
          </div>
          <div className="user-info">
            <div className="name-follow">
              <div className="user-name">{name}</div>
              <Button
                variant="outlined"
                onClick={onFollow}
                disabled={isFollowDisabled}
                className="MuiButton-root"
              >
                팔로우
              </Button>
            </div>

            <div className="user-id">@{github_id}</div>
          </div>
        </div>
        <div className="user-bio-container">
          <div className="user-bio">{bio}</div>
        </div>
      </div>
    </div>
  );
}
