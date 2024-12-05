import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "../../assets/logo_w.png"; // Importa la imagen
import { FaShoppingCart } from "react-icons/fa";

const NavbarComponent = ({ openLoginModal, openDetalleCarrito }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        {/* Logo en la barra de navegación */}
        <Navbar.Brand href="#home">
          <img
            src={logo} // Usamos la imagen importada
            alt="Logo"
            width="30" // Tamaño del logo
            height="30"
            className="logo d-inline-block align-top ms-3" // Clase de estilos
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
          <Nav className="ml-auto w-100">
            <Form className="d-flex w-100 ps-3" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="Buscar"
                className="mr-2 w-100"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-success" type="submit">
                <i className="bi bi-search"></i> {/* Icono de lupa */}
              </Button>
            </Form>
            <Nav className="ms-auto">
              <Nav.Link href="/productos">Productos</Nav.Link>
              <NavDropdown title="Categorias " id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Gabinete</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Gráficas</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Memorias</NavDropdown.Item>
              </NavDropdown>
              <button
                className="nav-link btn btn-link"
                onClick={openLoginModal} // Abre el modal al hacer clic
              >
                Ingresar
              </button>
            </Nav>
          </Nav>
          <Nav>
            <Nav.Link onClick={openDetalleCarrito}>
              <FaShoppingCart size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
