import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";

const NavbarComponent = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Jika scroll ke bawah, sembunyikan navbar
      } else {
        setShowNavbar(true); // Jika scroll ke atas, tampilkan navbar
      }
      lastScrollY = window.scrollY > 0 ? window.scrollY : 0; // Menyimpan posisi scroll terakhir
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`bg-light navbar-transition ${
        showNavbar ? "" : "navbar-hidden"
      }`}
    >
      <Container fluid>
        <Navbar.Brand>
          <img
            src="/src/assets/logo-ghamcak.png"
            alt="Logo"
            width="160"
            height="200"
            className="navbar-logo"
          />
          <span className="text-danger">E</span> -Rapor
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
