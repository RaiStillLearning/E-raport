import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
    >
      <Row
        className="shadow rounded w-100 mx-2 mx-md-5 overflow-hidden"
        style={{ maxWidth: "900px" }}
      >
        <Col xs={12} md={6} className="p-0">
          <img
            src="/src/assets/login-form.png"
            alt="Login Visual"
            className="img-fluid h-100 w-100 object-fit-cover"
          />
        </Col>

        <Col xs={12} md={6} className="bg-white p-4">
          <h3 className="mb-4 text-center">Login Guru</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Masukkan email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Masukkan password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTahun">
              <Form.Label>Tahun Pelajaran</Form.Label>
              <Form.Select>
                <option>2024/2025</option>
                <option>2023/2024</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCheckbox">
              <Form.Check type="checkbox" label="Simpan login" />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mb-2">
              Login
            </Button>

            <div className="text-end">
              <a href="#" className="text-muted text-decoration-none">
                Lupa password?
              </a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
