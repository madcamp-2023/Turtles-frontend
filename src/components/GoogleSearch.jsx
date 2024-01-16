import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import BookMark from "./BookMark";
import "./GoogleSearch.css";

export default function GoogleSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
      // Assuming you want to redirect to a Google search URL
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`;

      // Replace the current URL with the search URL
      window.location.replace(searchUrl);
    }
  };

  return (
    <div className="header">
      <>{/* logo */}</>
      <TextField
        id="input-with-sx"
        label="Google 검색 또는 URL 입력"
        variant="standard"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <BookMark />
    </div>
  );
}
