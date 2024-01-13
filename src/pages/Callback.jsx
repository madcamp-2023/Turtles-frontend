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
  console.log(`code: ${code}`);
  const tokenUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecrets}&code=${code}&redirect_uri=${redirectUrl}`;

  useEffect(() => {
    const getToken = async () => {
      try {
        await fetch(`${localPort}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error fetching data:", error));
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    // Call getToken only when code is available
    if (code) {
      getToken();
    }
  }, [code]);

  return <div>This is Callback {code}</div>;
}

export default Callback;
