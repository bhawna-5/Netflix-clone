import Home from "./pages/home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Player from "./pages/player/Player";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("logged in");
        navigate("/");
      } else {
        console.log("logged out");
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className="App">
      <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
