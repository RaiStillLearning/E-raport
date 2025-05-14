import React from "react";
import { Navbar, Container } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            src="/src/assets/logo-ghamcak.jpg"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          React Bootstrap Navbar
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
