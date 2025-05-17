// App.jsx
import React, { useState, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import NavbarComponent from "./components/navbar";
import Sidebar from "./components/Sidebar";
import { UserContext, UserProvider } from "./context/UserContext";

// Layout
import GuruLayout from "./layouts/GuruLayout";

// Pages
import BerandaGuru from "./pages/guru/Beranda";
import LandingPage from "./pages/guest/Beranda";
import LoginPage from "./LoginForm/LoginPage";
import RegisterPage from "./LoginForm/Register/Register";
import PesertaDidik from "./pages/guru/PesertaDidik";

function App() {
  const location = useLocation();
  const { userRole } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);

  const isSidebarPage = ["/guru/beranda", "/guru/pesertadidik"].includes(
    location.pathname
  );

  const RedirectBasedOnRole = () => {
    if (!userRole || userRole === "guest") return <Navigate to="/login" />;
    if (userRole === "guru") return <Navigate to="/guru/beranda" />;
    return <Navigate to="/login" />;
  };

  return (
    <div className="flex">
      {/* Sidebar hanya jika perlu */}
      {isSidebarPage && userRole === "guru" && <Sidebar />}

      <div
        className="flex-1"
        style={{
          marginLeft:
            isSidebarPage && userRole === "guru" ? (isOpen ? 220 + 40 : 40) : 0,
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {/* Navbar untuk halaman non-sidebar */}
        {!isSidebarPage && <NavbarComponent />}

        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Guest route */}
          <Route path="/landing" element={<LandingPage />} />

          {/* Guru routes with layout */}
          {userRole === "guru" && (
            <Route path="/guru" element={<GuruLayout />}>
              <Route path="beranda" element={<BerandaGuru />} />
              <Route path="pesertadidik" element={<PesertaDidik />} />
            </Route>
          )}

          {/* Redirect default */}
          <Route path="/" element={<RedirectBasedOnRole />} />

          {/* 404 fallback */}
          <Route path="*" element={<div>404 - Halaman tidak ditemukan</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  );
}
