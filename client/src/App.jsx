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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Estado para manejar la búsqueda
  const [products, setProducts] = useState([]); // Estado para almacenar productos

  const openLoginModal = () => {
    setModalContent("login");
    setIsModalOpen(true);
  };

  const openRegisterModal = () => {
    setModalContent("register");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setModalContent("success");
  };

  const handleRegisterSuccess = (name) => {
    setUserName(name);
    setModalContent("success");
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setModalContent("error");
  };

  const handleSearchQueryChange = (query) => {
    console.log("Búsqueda actualizada:", query); // Puedes actualizar el estado o lógica aquí
    setSearchQuery(query);
  };

  // Función para manejar la selección de una categoría
  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/categorias/${categoryId}/productos`);
      setProducts(response.data); // Actualiza los productos con la respuesta de la API
    } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
    }
  };

  return (
    <>
      <NavbarComponent
        openLoginModal={openLoginModal}
        onCategoryClick={handleCategoryClick} // Pasamos la función de manejar categorías
        onShowAllProducts={() => console.log("Mostrando todos los productos")}
        onSearchQueryChange={handleSearchQueryChange} // Pasamos la función de búsqueda
      />
      <main>
        <Hero />
        <ProductList filter="" searchQuery={searchQuery} products={products} /> {/* Pasamos los productos al ProductList */}
      </main>
      <Footer />

      <Modal show={isModalOpen} onHide={closeModal} centered>
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
              onClose={closeModal}
              onRegister={openRegisterModal}
              onSuccess={handleLoginSuccess}
              onError={handleError}
            />
          )}
          {modalContent === "register" && (
            <RegisterForm
              onClose={closeModal}
              onSuccess={handleRegisterSuccess}
              onError={handleError}
            />
          )}
          {modalContent === "success" && (
            <SuccessModal
              message={`Bienvenido, ${userName}`}
              onClose={closeModal}
            />
          )}
          {modalContent === "error" && (
            <ErrorModal message={errorMessage} onClose={closeModal} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;