import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Callback from "./pages/Callback";
import Home from "./pages/Home";
import Login from "./pages/Login";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    console.log("PrivateRoute");
    if (!uid) {
      navigate("/login");
    }
  }, [uid, navigate]);

  return uid ? children : null;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home/*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
