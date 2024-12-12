import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
import logo from "../../assets/logo_w.png";
import { FaShoppingCart } from "react-icons/fa";
import defaultPersonIcon from "../../assets/person.png"; // Imagen por defecto para el usuario
import "./NavbarComponent.css";

const NavbarComponent = ({
  openLoginModal,
  openDetalleCarrito,
  onCategoryClick,
  onShowAllProducts,
  onSearchQueryChange,
  onProductsUpdate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [userImage, setUserImage] = useState(defaultPersonIcon);

  // Verificar el estado de autenticación al cargar la página
  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    if (savedLoginState === "true") {
      setIsLoggedIn(true);
      // Puedes cargar la imagen del usuario desde el servidor si es necesario
      setUserImage(localStorage.getItem("userImage") || defaultPersonIcon);
    }
  }, []);

  // Guardar el estado de autenticación en localStorage
  const saveLoginState = (loggedIn, image) => {
    localStorage.setItem("isLoggedIn", loggedIn);
    setIsLoggedIn(loggedIn);
    if (image) {
      localStorage.setItem("userImage", image);
      setUserImage(image);
    }
  };

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/categorias");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  // Manejar el inicio de sesión
  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", credentials);
      if (response.data.success) {
        saveLoginState(true, response.data.userImage || defaultPersonIcon);
      } else {
        console.log("Error en inicio de sesión");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  // Manejar cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (typeof onSearchQueryChange === "function") {
      onSearchQueryChange(query);
    }
  };

  // Manejar selección de categoría
  const handleCategorySelect = async (categoryId) => {
    console.log("Categoría seleccionada:", categoryId);
    try {
      const response = await axios.get(`http://localhost:3001/api/productos`, {
        params: { categoryId },
      });
      setProducts(response.data);
      if (typeof onProductsUpdate === "function") {
        onProductsUpdate(response.data);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    saveLoginState(false, defaultPersonIcon);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userImage");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            alt="Logo de la tienda"
            width="30"
            height="30"
            className="logo d-inline-block align-top ms-3"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
          <Nav className="ml-auto w-100">
            <Form className="d-flex w-100 ps-3">
              <FormControl
                type="search"
                placeholder="Buscar"
                className="mr-2 w-100"
                aria-label="Buscar productos en la tienda"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-success" aria-label="Buscar">
                <i className="bi bi-search"></i>
              </Button>
            </Form>
            <Nav className="ms-auto">
              <Nav.Link
                href="#productos"
                onClick={onShowAllProducts}
                aria-label="Ver todos los productos"
              >
                Productos
              </Nav.Link>
              <NavDropdown
                title="Categorías"
                id="collasible-nav-dropdown"
                aria-label="Filtrar por categorías"
              >
                {categories.map((cat) => (
                  <NavDropdown.Item
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat._id)}
                    aria-label={`Filtrar productos por la categoría ${cat.nombre}`}
                  >
                    {cat.nombre}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              {!isLoggedIn ? (
                <button
                  className="nav-link btn btn-link"
                  onClick={openLoginModal}
                  aria-label="Abrir modal de inicio de sesión"
                >
                  Ingresar
                </button>
              ) : (
                <NavDropdown
                  title={
                    <img
                      src={userImage}
                      alt="Ícono de usuario"
                      width="30"
                      height="30"
                      className="person-icon rounded-circle"
                    />
                  }
                  id="user-dropdown"
                  alignRight
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={openDetalleCarrito}
              className="cart-icon"
              aria-label="Abrir el carrito de compras"
            >
              <FaShoppingCart size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;