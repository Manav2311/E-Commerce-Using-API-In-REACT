import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="bg-secondary shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link to={"/"} className="text-decoration-none text-light  fw-bold fs-4">
            ShopEase
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={"/addProduct"} className="text-decoration-none fw-medium text-light">
                Add Product
              </Link>
            </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
