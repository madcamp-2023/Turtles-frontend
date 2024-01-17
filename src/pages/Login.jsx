import React from "react";
import LoginBtn from "../components/LoginBtn";
import Logo from "../components/Logo";
import "./Login.css";

function Login() {
  return (
    <div className="Login">
      <div className="login-logo">
        <Logo />
      </div>
      <LoginBtn />
    </div>
  );
}

export default Login;
