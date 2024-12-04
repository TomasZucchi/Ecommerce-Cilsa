// LoginForm.jsx
import React, { useState } from "react";
import password_icon from "../../assets/password.png";
import email_icon from "../../assets/email.png";

function LoginForm({ onClose, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        onClose(); // Cerrar modal al iniciar sesión correctamente
        alert("Inicio de sesión exitoso"); // Mostrar mensaje de éxito
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert("Error en el inicio de sesión: " + errorData.message); // Manejar el error
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión: " + error.message); // Manejar errores de red
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          Ingresar
        </button>
        <button type="button" className="btn btn-primary" onClick={onRegister}>
          Registrarse
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
