import React, { useState } from "react";
import NavbarComponent from "./components/NavBar/NavBar";
import Hero from "./components/Carousel/Carousel";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
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
      <NavbarComponent openLoginModal={openLoginModal} />
      <main>
        <Hero />
      </main>
      <Footer />

      {/* Modal para Iniciar Sesión */}
      <Modal
        show={isLoginModalOpen}
        onClose={closeLoginModal}
        title="Iniciar Sesión"
      >
        <LoginForm onRegister={openRegisterModal} />
      </Modal>

      {/* Modal para Registrarse */}
      <Modal
        show={isRegisterModalOpen}
        onClose={closeRegisterModal}
        title="Registrarse"
      >
        <RegisterForm onLogin={openLoginModal} />
      </Modal>
    </>
  );
}

export default App;
