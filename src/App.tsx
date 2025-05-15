import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// import components
import NavbarComponent from "./components/navbar";
import LoginPage from "./LoginForm/LoginPage";
import RegisterPage from "./LoginForm/Register/Register";
import LandingPage from "./pages/Beranda";

// Pembungkus supaya bisa pakai useLocation
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/landing";

  return (
    <>
      {!isLandingPage && <NavbarComponent />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
