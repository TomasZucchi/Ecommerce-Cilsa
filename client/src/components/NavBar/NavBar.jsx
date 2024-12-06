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
  const [products, setProducts] = useState([]); // Agregar estado para los productos

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categorias"
        );
        setCategories(response.data); // Guarda las categorías obtenidas
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  // Manejar cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (typeof onSearchQueryChange === "function") {
      onSearchQueryChange(query); // Llamamos a la función pasada como prop
    }
  };

  // Manejar selección de categoría
  const handleCategorySelect = async (categoryId) => {
    console.log("Categoría seleccionada:", categoryId);
    try {
      const response = await axios.get(`http://localhost:3001/api/productos`); // Solicitar productos por categoría
      setProducts(response.data); // Almacenar productos obtenidos en el estado
      if (typeof onProductsUpdate === "function") {
        onProductsUpdate(response.data); // Enviar los productos al componente padre
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            alt="Logo"
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
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange} // Actualizamos el valor de la búsqueda
              />
              <Button variant="outline-success">
                <i className="bi bi-search"></i> {/* Icono de lupa */}
              </Button>
            </Form>
            <Nav className="ms-auto">
              <Nav.Link href="#productos" onClick={onShowAllProducts}>
                Productos
              </Nav.Link>
              <NavDropdown title="Categorías" id="collasible-nav-dropdown">
                {categories.map((cat) => (
                  <NavDropdown.Item
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat._id)} // Pasamos el ID de la categoría
                  >
                    {cat.nombre}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <button
                className="nav-link btn btn-link"
                onClick={openLoginModal}
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
