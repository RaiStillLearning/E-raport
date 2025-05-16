import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Nav, Collapse } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo-ghamcak.png";

const Sidebar = () => {
  const { userRole } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setIsOpen(!mobile);
  }, []);

  const menuItems = [
    { name: "Beranda", path: "/landing" },
    ...(userRole === "guru" || userRole === "admin"
      ? [{ name: "Tambah Nilai", path: "/tambah-nilai" }]
      : []),
    ...(userRole === "admin"
      ? [{ name: "Kelola Pengguna", path: "/pengguna" }]
      : []),
  ];

  const dropdownItems = [
    { name: "Profil Saya", path: "/profil" },
    { name: "Pengaturan", path: "/pengaturan" },
  ];

  const sidebarWidth = 220;
  const toggleWidth = 40;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          display: "flex",
          zIndex: 1040,
        }}
      >
        {/* Sidebar */}
        <div
          className="bg-dark text-white p-3"
          style={{
            width: isOpen ? sidebarWidth : 0,
            overflow: "hidden",
            transition: "width 0.3s ease-in-out",
          }}
        >
          {isOpen && (
            <>
              <div className="text-center mb-4">
                <img src={Logo} alt="Logo" style={{ height: "60px" }} />
                <div className="mt-2">Role Kamu: {userRole}</div>
              </div>

              <Nav className="flex-column">
                {menuItems.map((item) => (
                  <Nav.Link
                    as={Link}
                    to={item.path}
                    key={item.path}
                    onClick={() => isMobile && setIsOpen(false)}
                    className={`text-white mb-2 ${
                      location.pathname === item.path ? "fw-bold" : ""
                    }`}
                  >
                    {item.name}
                  </Nav.Link>
                ))}

                <Button
                  variant="link"
                  className="text-white text-start"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-controls="dropdown-collapse"
                  aria-expanded={dropdownOpen}
                >
                  ⚙️ Pengguna ▼
                </Button>
                <Collapse in={dropdownOpen}>
                  <div id="dropdown-collapse">
                    {dropdownItems.map((item) => (
                      <Nav.Link
                        as={Link}
                        to={item.path}
                        key={item.path}
                        onClick={() => isMobile && setIsOpen(false)}
                        className="text-white ms-3 mb-2"
                      >
                        {item.name}
                      </Nav.Link>
                    ))}
                  </div>
                </Collapse>
              </Nav>
            </>
          )}
        </div>

        <div
          style={{
            width: toggleWidth,
            backgroundColor: "#343a40",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Button
            variant="dark"
            onClick={() => setIsOpen(!isOpen)}
            style={{ padding: 0, width: "30px", height: "30px" }}
            aria-label="Toggle Sidebar"
          >
            ☰
          </Button>
        </div>
      </div>

      <div
        style={{
          marginLeft: isOpen ? sidebarWidth + toggleWidth : toggleWidth,
          transition: "margin-left 0.3s ease-in-out",
          padding: "1rem",
        }}
      />
    </>
  );
};

export default Sidebar;
