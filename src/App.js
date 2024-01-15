import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("App");
    const uid = localStorage.getItem("uid");
    if (uid) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Loading...</div>;
}

export default App;
