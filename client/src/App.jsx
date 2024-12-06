import React, { useState } from "react";
import NavbarComponent from "./components/NavBar/NavBar";
import Hero from "./components/Carousel/Carousel";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import Modal from "react-bootstrap/Modal";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import SuccessModal from "./components/Modal/Success";
import ErrorModal from "./components/Modal/Error";
import axios from "axios"; // Asegúrate de importar axios
import DetalleCarrito from "./components/Carrito/Carrito";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDetalleCarritoOpen, setIsDetalleCarritoOpen] = useState(false);
  const [modalContent, setModalContent] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // Estado para manejar la búsqueda
  const [pedidos, setPedidos] = useState([]); // Estado para almacenar los pedidos
  const [products, setProducts] = useState([]); // Estado para almacenar productos

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
    setModalContent("login");
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
    setModalContent("register");
  };

  const closeRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const openDetalleCarrito = () => {
    setIsDetalleCarritoOpen(true);
  };
  const closeDetalleCarrito = () => {
    setIsDetalleCarritoOpen(false);
  };

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setModalContent("success");
  };

  const handleRegisterSuccess = (name) => {
    setUserName(name);
    setModalContent("success");
    openLoginModal(); // Abrir el modal de inicio de sesión después de un registro exitoso
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setModalContent("error");
  };

  const handleRetry = () => {
    setModalContent("register");
  };

  const handleSearchQueryChange = (query) => {
    console.log("Búsqueda actualizada:", query); // Puedes actualizar el estado o lógica aquí
    setSearchQuery(query);
  };

  // Función para manejar la selección de una categoría
  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/categorias/${categoryId}/productos`
      );
      setProducts(response.data); // Actualiza los productos con la respuesta de la API
    } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
    }
  };

  return (
    <>
      <NavbarComponent
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
        openDetalleCarrito={openDetalleCarrito}
        onCategoryClick={handleCategoryClick} // Pasamos la función de manejar categorías
        onShowAllProducts={() => console.log("Mostrando todos los productos")}
        onSearchQueryChange={handleSearchQueryChange} // Pasamos la función de búsqueda
      />
      <main>
        <Hero />
        <ProductList
          filter=""
          searchQuery={searchQuery}
          products={products}
        />{" "}
        {/* Pasamos los productos al ProductList */}
      </main>
      <Footer />

      {/* Modal */}
      <Modal
        show={isLoginModalOpen || isRegisterModalOpen}
        onHide={closeLoginModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalContent === "login" && "Iniciar Sesión"}
            {modalContent === "register" && "Registrarse"}
            {modalContent === "success" && `Bienvenido, ${userName}`}
            {modalContent === "error" && "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === "login" && (
            <LoginForm
              onClose={closeLoginModal}
              onRegister={openRegisterModal}
              onSuccess={handleLoginSuccess}
              onError={handleError}
            />
          )}
          {modalContent === "register" && (
            <RegisterForm
              onClose={closeRegisterModal}
              onLogin={openLoginModal}
              onSuccess={handleRegisterSuccess}
              onError={handleError}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {modalContent === "success" && (
            <SuccessModal
              message="Ha iniciado sesión correctamente"
              onClose={closeLoginModal}
            />
          )}
          {modalContent === "error" && (
            <ErrorModal
              message={errorMessage}
              onClose={closeLoginModal}
              onRetry={handleRetry}
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Modal para Detalle de Carrito */}
      <Modal show={isDetalleCarritoOpen} onHide={closeDetalleCarrito} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalle del Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pedidos.length > 0 ? (
            <ul>
              {pedidos.map((pedido, index) => (
                <li key={index}>{pedido}</li>
              ))}
            </ul>
          ) : (
            <p>No hay pedidos en el carrito.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeDetalleCarrito}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
