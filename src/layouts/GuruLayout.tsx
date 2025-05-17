import React, { useState } from "react";
import { Container, Row, Col, Offcanvas, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function GuruLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  return (
    <>
      {/* Tombol Menu hanya muncul di layar kecil */}

      <Container fluid>
        <Row>
          {/* Sidebar desktop (md ke atas) */}
          <Col
            md={3}
            className="bg-light vh-100 p-3 shadow-sm d-none d-md-block"
            style={{ position: "sticky", top: 0 }}
          >
            <Sidebar />
          </Col>

          {/* Konten utama */}
          <Col xs={12} md={9} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>

      {/* Sidebar offcanvas untuk layar kecil */}
      <Offcanvas show={showSidebar} onHide={handleClose} responsive="md">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar onClickLink={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
