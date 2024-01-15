import React, { useEffect, useState } from "react";
import Home from "./Home";

function Callback() {
  const [token, setToken] = useState("");
  const code = new URL(window.location.href).searchParams.get("code");
  const localPort = process.env.LOCAL_PORT;
  const handleLogin = async ({ uid, name, login, profile_img, github_url }) => {
    localStorage.setItem("uid", uid);
    localStorage.setItem("name", name);
    localStorage.setItem("github_id", login);
    localStorage.setItem("profile_img", profile_img);
    localStorage.setItem("github_url", github_url);
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
        console.log(data);

        // Assuming your response contains a 'token' property
        if (data.user) {
          handleLogin({
            uid: data.user.uid,
            name: data.user.name,
            login: data.user.login,
            profile_img: data.user.profile_img,
            github_url: data.user.github_url,
          });
          setToken(data);
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    // Call getToken only when code is available
    if (code) {
      getToken();
    }
  }, [code]);

  // Render Home component when token is available
  if (token) {
    return <Home />;
  }

  return <div>This is Callback {code}</div>;
}

export default Callback;
