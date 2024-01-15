import React, { useState } from "react";
import Button from "@mui/material/Button";

function LoginBtn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const clientId = process.env.CLIENT_ID;
  const redirectUrl = process.env.REDIRECT_URL;

  // const codeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo:status read:repo_hook user:email&redirect_uri=${redirectUrl}`;
  const codeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}`;

  return (
    <Button variant="contained" href={codeUrl}>
      GitHub로 로그인하기
    </Button>
  );
}

export default LoginBtn;
