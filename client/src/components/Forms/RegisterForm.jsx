import React, { useState } from "react";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

function RegisterForm({ onClose, onLogin }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (response.ok) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        onClose(); // Cerrar el modal de registro
      } else {
        const errorData = await response.json();
        console.error("Register failed:", errorData);
        alert("Error al registrarse: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error, intenta nuevamente.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <img src={user_icon} alt="User Icon" width="20" height="20" />
          </span>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Nombre completo"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <img src={email_icon} alt="Email Icon" width="20" height="20" />
          </span>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <img
              src={password_icon}
              alt="Password Icon"
              width="20"
              height="20"
            />
          </span>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onLogin} // Llama a la función para abrir el modal de inicio de sesión
        >
          Ingresar
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
