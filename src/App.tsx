import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import components
import NavbarComponent from "./components/navbar";
import LoginPage from "./LoginForm/LoginPage";
import LandingPage from "./pages/Beranda";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
