import React, { useState } from "react";
import Button from "@mui/material/Button";

function LoginBtn() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  console.log(`clientId: ${clientId}`);
  console.log(`redirectUri: ${redirectUri}`);

  const codeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

  return (
    <Button variant="contained" href={codeUrl}>
      GitHub로 로그인하기
    </Button>
  );
}

export default LoginBtn;
