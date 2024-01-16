import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import UserProfile from "./UserProfile";
import "./SearchBar.css";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import debounce from "lodash/debounce";

import AccountCircle from "@mui/icons-material/AccountCircle";

Modal.setAppElement("#root"); // Set the root element for accessibility

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState();

  const localPort = process.env.REACT_APP_LOCAL_PORT; // Replace with your server port
  const uid = localStorage.getItem("uid");

  // Debounce the search function to avoid too many requests
  const handleSearch = async (keyword) => {
    try {
      const response = await fetch(`${localPort}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
  }; // Adjust the debounce delay as needed

  useEffect(() => {
    console.log(`searchKeyword: ${searchKeyword}`);
    if (searchKeyword.trim() !== "") {
      handleSearch(searchKeyword);
    } else {
      setSearchResult(null);
    }

    // Cleanup function to cancel the previous request when the keyword changes
  }, [searchKeyword]);

  return (
    <div>
      <Input
        id="input-with-icon-adornment"
        value={searchKeyword}
        placeholder="GitHub ID로 친구 찾기"
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      {searchResult && searchResult.user.length > 0 ? (
        <div className="search-overlay">
          {searchResult.user.map((user) => (
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
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default SearchBar;
