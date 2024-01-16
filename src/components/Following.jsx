import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import Stack from "@mui/material/Stack";

export default function Following() {
  const [following, setFollowing] = useState([]);
  const localPort = process.env.REACT_APP_LOCAL_PORT;
  const uid = localStorage.getItem("uid");
  const queryParams = new URLSearchParams({
    uid: uid,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, []);

  return (
    <>
      <Stack direction="column">
        <SearchBar />
        <Stack direction="column">
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
        </Stack>
      </Stack>
    </>
  );
}
