import { Navbar, Container } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>
          <img
            src="/src/assets/logo-ghamcak.png"
            alt="Logo"
            width="160"
            height="200"
            className="navbar-logo"
          />{" "}
          <span className="text-danger">E</span> -Rapor
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
