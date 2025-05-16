import React, { useState, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

//navbar
import NavbarComponent from "./components/navbar";
import Sidebar from "./components/Sidebar";

// Import UserContext dan UserProvider
import { UserContext, UserProvider } from "./context/UserContext";

// Layouts
import GuruLayout from "./layouts/GuruLayout";

// Pages
import BerandaGuru from "./pages/guru/Beranda";
import LandingPage from "./pages/guest/Beranda";
import LoginPage from "./LoginForm/LoginPage";
import RegisterPage from "./LoginForm/Register/Register";

function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const { userRole } = useContext(UserContext);

  // Halaman yang punya sidebar, contoh
  const isSidebarPage = [
    "/guru/beranda",
    "/tambah-nilai",
    "/pengguna",
  ].includes(location.pathname);

  // Fungsi redirect otomatis dari '/' sesuai role
  const RedirectBasedOnRole = () => {
    if (!userRole || userRole === "guest") {
      return <Navigate to="/login" replace />;
    }
    if (userRole === "guru") {
      return <Navigate to="/guru/beranda" replace />;
    }
    // Bisa tambah role lain, misal admin
    // if (userRole === "admin") return <Navigate to="/admin/beranda" replace />;
    return <Navigate to="/login" replace />;
  };

  return (
    <div className="flex">
      {isSidebarPage && userRole !== "guest" && <Sidebar />}

      <div
        className="flex-1"
        style={{
          marginLeft:
            isSidebarPage && userRole !== "guest"
              ? isOpen
                ? 220 + 40
                : 40
              : 0,
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {/* Navbar hanya tampil kalau bukan halaman sidebar */}
        {!isSidebarPage && <NavbarComponent />}

        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Guest route */}
          <Route path="/landing" element={<LandingPage />} />

          {/* Guru route dengan layout */}
          <Route
            path="/guru/*"
            element={
              userRole === "guru" ? (
                <GuruLayout>
                  <Routes>
                    <Route path="beranda" element={<BerandaGuru />} />
                    {/* Tambah halaman guru lain */}
                  </Routes>
                </GuruLayout>
              ) : (
                // Kalau bukan guru, redirect ke login
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Default route */}
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
