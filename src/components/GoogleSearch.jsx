import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import BookMark from "./BookMark";
import "./GoogleSearch.css";
import Logo from "./Logo";

export default function GoogleSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
      // Assuming you want to redirect to a Google search URL
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`;

      // Open a new tab and redirect to the search URL
      const newTab = window.open();
      newTab.location.assign(searchUrl);
    }
  };

  return (
    <div className="header">
      <Logo />
      <div className="google-search-container">
        <div className="google-search">
          <TextField
            id="input-with-sx"
            label="Google 검색 또는 URL 입력"
            variant="standard"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      <BookMark />
    </div>
  );
}
