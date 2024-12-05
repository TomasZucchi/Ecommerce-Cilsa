import React from "react";
import error from "../../assets/error.png"; // Asegúrate de ajustar la ruta según tu estructura de carpetas

function ErrorModal({ message, onClose }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img src={error} alt="Error" width="200" height="200" />
      <br />
      <p>{message}</p>
    </div>
  );
}

export default ErrorModal;
