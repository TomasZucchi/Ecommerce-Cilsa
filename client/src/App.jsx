import React, { useState } from "react";
import NavbarComponent from "./components/NavBar/NavBar";
import Hero from "./components/Carousel/Carousel";
import Footer from "./components/Footer/Footer";
import Modal from "react-bootstrap/Modal";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import SuccessModal from "./components/Modal/Success";
import ErrorModal from "./components/Modal/Error";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("login"); // "login", "register", "success", "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState(""); // Estado para almacenar el nombre del usuario

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
    setModalContent("login");
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
    setModalContent("register");
  };
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

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

  return (
    <>
      <NavbarComponent
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
      />
      <main>
        <Hero />
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
              onSuccess={handleRegisterSuccess}
              onError={handleError}
            />
          )}
          {modalContent === "success" && (
            <SuccessModal
              message={`Bienvenido, ${userName}`}
              onClose={closeLoginModal}
            />
          )}
          {modalContent === "error" && (
            <ErrorModal message={errorMessage} onClose={closeLoginModal} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
