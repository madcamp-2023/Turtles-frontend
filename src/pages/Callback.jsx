import React, { useEffect, useState } from "react";
import qs from "qs";
import {
  clientId,
  clientSecrets,
  localPort,
  redirectUrl,
} from "../constants/Env";
import Home from "./Home";

function Callback() {
  const [token, setToken] = useState("");
  const code = new URL(window.location.href).searchParams.get("code");

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
        if (data) {
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
