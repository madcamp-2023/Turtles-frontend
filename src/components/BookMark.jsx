import React from "react";
import "./BookMark.css";
import LogoutBtn from "./LogoutBtn";

export default function BookMark() {
  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const handleGPTClick = () => {
    openLinkInNewTab("https://chat.openai.com/chat");
  };

  const handleFigmaClick = () => {
    openLinkInNewTab("https://figma.com");
  };

  const handleGithubClick = () => {
    openLinkInNewTab("https://github.com/");
  };

  return (
    <div className="bookmarks">
      <img
        src="https://github.com/madcamp-2023/w3-essh-frontend/assets/79096116/b71405bb-d06c-4049-8e87-ee977e42d7de"
        className="gpt"
        onClick={handleGPTClick}
        alt="GPT"
      />
      <div className="figma-container" onClick={handleFigmaClick}>
        <img
          src="https://github.com/madcamp-2023/w3-essh-frontend/assets/79096116/43ac48fc-e043-40ab-86c6-6dd984342b81"
          className="figma"
          alt="Figma"
        />
      </div>
      <div className="github-container" onClick={handleGithubClick}>
        <img
          src="https://github.com/madcamp-2023/w3-essh-frontend/assets/79096116/d32cd94a-14f3-4ade-b892-da4441e44b60"
          className="github"
          alt="GitHub"
        />
      </div>
      <div className="logout-container">
        <LogoutBtn />
      </div>
    </div>
  );
}
