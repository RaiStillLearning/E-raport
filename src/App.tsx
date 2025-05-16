import React, { useState, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Import UserContext dan UserProvider yang kamu buat
import { UserContext, UserProvider } from "./context/UserContext";

// Import components
import NavbarComponent from "./components/navbar";
import Sidebar from "./components/SideBar";
import LoginPage from "./LoginForm/LoginPage";
import RegisterPage from "./LoginForm/Register/Register";
import LandingPage from "./pages/Beranda";

const sidebarWidth = 220;
const toggleWidth = 40;

function AppWrapper() {
  // Bungkus App dengan UserProvider dan Router supaya context dan routing berjalan
  return (
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  );
}

function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Ambil userRole dari context, bukan localStorage langsung
  const { userRole } = useContext(UserContext);

  const isLandingRelated = ["/landing", "/tambah-nilai", "/pengguna"].includes(
    location.pathname
  );

  return (
    <div className="flex">
      {isLandingRelated && userRole !== "guest" && (
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      <div
        className="flex-1"
        style={{
          marginLeft:
            isLandingRelated && userRole !== "guest"
              ? isOpen
                ? sidebarWidth + toggleWidth
                : toggleWidth
              : 0,
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {!isLandingRelated && <NavbarComponent />}

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/landing" element={<LandingPage />} />
          {/* tambah rute lainnya di sini */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppWrapper;
