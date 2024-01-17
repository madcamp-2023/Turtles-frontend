import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import Home from "./Home";
import Logo from "../components/Logo";

import "./Callback.css";

function Callback() {
  const [token, setToken] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const code = new URL(window.location.href).searchParams.get("code");
  const localPort = process.env.REACT_APP_LOCAL_PORT;
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (uid) {
      // Navigate to the Login page if uid is undefined
      navigate("/home");
    }
  }, [uid, navigate]);
  const handleLogin = async ({
    uid,
    name,
    github_id,
    profile_img,
    github_url,
    bio,
  }) => {
    console.log("handling login");
    localStorage.setItem("uid", uid);
    localStorage.setItem("name", name);
    localStorage.setItem("github_id", github_id);
    localStorage.setItem("profile_img", profile_img);
    localStorage.setItem("github_url", github_url);
    localStorage.setItem("bio", bio);

    // Use the navigate function to navigate to '/home'
    navigate("/home");
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(`${localPort}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
          }),
        });

        const data = await response.json();
        console.log("data", data);
        // Assuming your response contains a 'token' property
        if (data.success) {
          handleLogin({
            uid: data.userInfo.uid,
            name: data.userInfo.name,
            github_id: data.userInfo.github_id,
            profile_img: data.userInfo.profile_img,
            github_url: data.userInfo.github_url,
            bio: data.userInfo.bio,
          });
          setToken(true);
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    // Call getToken only when code is available
    if (code) {
      getToken();
    }
  }, [code, navigate]);

  // Render Home component when token is available
  if (token) {
    return <Home />;
  }

  return (
    <div className="callback">
      <div className="callback-logo">
        <Logo />
      </div>
      <div className="callback-text">Loading</div>
    </div>
  );
}

export default Callback;
