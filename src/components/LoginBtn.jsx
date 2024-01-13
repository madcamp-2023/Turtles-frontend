import React, { useState } from "react";
import Button from "@mui/material/Button";
import { clientId, redirectUrl } from "../constants/Env";

function LoginBtn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const codeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo:status read:repo_hook user:email&redirect_uri=${redirectUrl}`;
  const codeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}`;

  return (
    <Button variant="contained" href={codeUrl}>
      GitHub로 로그인하기
    </Button>
  );
}

export default LoginBtn;
