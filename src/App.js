import { useState, useRouter } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Router, Route, Routes } from "react-router-dom";
import Callback from "./pages/Callback";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return isLoggedIn ? (
    <Home />
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
}

export default App;
