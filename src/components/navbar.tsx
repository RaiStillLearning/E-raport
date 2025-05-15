import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavbarComponent = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [expanded, setExpanded] = useState(false);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Scroll ke bawah, sembunyikan
      } else {
        setShowNavbar(true); // Scroll ke atas, tampilkan
      }
      lastScrollY = window.scrollY > 0 ? window.scrollY : 0;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`navbar-transition ${showNavbar ? "" : "navbar-hidden"} bg-light`}
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="/src/assets/logo-ghamcak.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "100px", height: "auto" }}
          />
          <span className="text-danger ms-2">E</span> -Rapor
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#kontak">Kontak</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
