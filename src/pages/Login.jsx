import React, { useEffect, useState } from "react";
import LoginBtn from "../components/LoginBtn";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <LoginBtn />
      <div>This is login page</div>
    </div>
  );
}

export default Login;
