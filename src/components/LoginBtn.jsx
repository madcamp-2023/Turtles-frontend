// LoginBtn.jsx
import React from "react";
import "./LoginBtn.css";

function LoginBtn() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri =
    "https://w3-essh-frontend-madprotector.vercel.app/callback";

  console.log(`clientId: ${clientId}`);
  console.log(`redirectUri: ${redirectUri}`);

  const codeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleLoginClick = () => {
    window.location.href = codeUrl;
  };

  return (
    <button onClick={handleLoginClick} className="login-button">
      <div className="btn-container">
        <div className="login-content-container">
          <img
            src="https://github.com/madcamp-2023/w3-essh-frontend/assets/79096116/59b92efe-ad04-4a1d-819c-e4213f7e05a7"
            alt="Button Image"
            className="github-img"
          />
          <div className="login-content">GitHub로 로그인하기</div>
        </div>
      </div>
    </button>
  );
}

export default LoginBtn;
