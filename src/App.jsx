import "./index.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/index.jsx";
import RegisterPage from "@/components/pages/RegisterPage/index.jsx";
import HomePage from "./components/pages/HomePage/index.jsx";
import ExamplePage from "./components/pages/ExamplePage/index.jsx";
import Navbar from "./components/CNavbar/index.jsx";
import HackathonPage from "./components/pages/HackathonPage/index.jsx";
import AdminPage from "./components/pages/AdminPage/index.jsx";

function App() {
  const location = useLocation();

  return (
    <div className="appContainer">
      {location.pathname !== "/register" && location.pathname !== "/login" && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/hackathon" element={<HackathonPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/example" element={<ExamplePage />} />
      </Routes>
    </div>
  );
}

export default App;
