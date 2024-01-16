import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import UserSearch from "./UserSearch";
import "./SearchBar.css";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";

import InputAdornment from "@mui/material/InputAdornment";
import debounce from "lodash/debounce";

import SearchIcon from "@mui/icons-material/Search";
Modal.setAppElement("#root"); // Set the root element for accessibility

export default function SearchBar({ onUpdate }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState();
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
        setFollowing(result.friends.map((user) => user.github_id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (keyword) => {
    try {
      const response = await fetch(`${localPort}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          github_id: keyword,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setSearchResult(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log(`searchKeyword: ${searchKeyword}`);
    if (searchKeyword.trim() !== "") {
      handleSearch(searchKeyword);
    } else {
      setSearchResult(null);
    }
  }, [searchKeyword]);

  return (
    <div>
      <div className="input-container">
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="GitHub ID로 친구 검색"
          variant="standard"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {searchResult && searchResult.user.length > 0 ? (
        <div className="search-overlay">
          {searchResult.user.map((user) => (
            <UserSearch
              key={user.uid}
              uid={user.uid}
              name={user.name}
              github_id={user.github_id}
              profile_img={user.profile_img}
              bio={user.bio}
              isFollowing={following.includes(user.github_id)}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
