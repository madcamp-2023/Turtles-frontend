import React, { useState, useEffect } from "react";
import "./Following.css";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import Stack from "@mui/material/Stack";

export default function Following() {
  const [following, setFollowing] = useState([]);
  const [updateFollowing, setUpdateFollowing] = useState(false);
  const localPort = process.env.REACT_APP_LOCAL_PORT;
  const uid = localStorage.getItem("uid");
  const queryParams = new URLSearchParams({
    uid: uid,
  });

  console.log(`updateFollowing: ${updateFollowing}`);

  const handleUpdateFollowing = () => {
    console.log("handleUpdateFollowing called");
    setUpdateFollowing(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Introduce a delay of 1000 milliseconds (1 second)
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(1000);

        const response = await fetch(
          `${localPort}/friend?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("result of GET friend", result);
        setFollowing(result.friends);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setUpdateFollowing(false);
  }, [updateFollowing]);

  return (
    <>
      <Stack direction="column" spacing={2}>
        <SearchBar onUpdate={handleUpdateFollowing} />
        <Stack direction="column" spacing={2} alignItems="center">
          <div className="following-title">팔로잉 목록</div>
          <div className="following-list">
            {following.map((user) => (
              <UserProfile
                key={user.uid}
                uid={user.uid}
                name={user.name}
                github_id={user.github_id}
                profile_img={user.profile_img}
                bio={user.bio}
              />
            ))}
          </div>
        </Stack>
      </Stack>
    </>
  );
}
