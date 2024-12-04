import React, { useState } from "react";
import NavbarComponent from "./components/NavBar/NavBar";
import Hero from "./components/Carousel/Carousel";
import Footer from "./components/Footer/Footer";
import Modal from "react-bootstrap/Modal";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

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

      {/* Modal para Iniciar Sesión */}
      <Modal show={isLoginModalOpen} onHide={closeLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onClose={closeLoginModal} onRegister={openRegisterModal} />
        </Modal.Body>
      </Modal>

      {/* Modal para Registrarse */}
      <Modal show={isRegisterModalOpen} onHide={closeRegisterModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm onClose={closeRegisterModal} onLogin={openLoginModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
