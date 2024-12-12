import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import password_icon from "../../assets/password.png";
import email_icon from "../../assets/email.png";
import defaultPersonIcon from "../../assets/person.png"; // Importa el icono por defecto

function LoginForm({ onClose, onRegister, onSuccess, onError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Envía los datos al servidor
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        
        // Guarda la imagen del usuario o usa un icono por defecto
        const userImage = data.imagen || defaultPersonIcon;
        setUser({ ...data, imagen: userImage });
        localStorage.setItem("token", data.token); // Almacena el token en localStorage
        localStorage.setItem("userImage", userImage); // Guarda la imagen del usuario en localStorage

        onSuccess(data.nombre); // Llamar a la función onSuccess con el nombre del usuario
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        onError("Error en el inicio de sesión: " + errorData.message); // Manejo de errores
      }
    } catch (error) {
      console.error("Error:", error);
      onError("Error de conexión: " + error.message); // Manejo de errores de red
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <div className="input-group">
          <span className="input-group-text" aria-hidden="true">
            <img
              src={email_icon}
              alt="Ícono de correo electrónico"
              width="20"
              height="20"
              aria-label="Ícono de correo electrónico"
            />
          </span>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Introduce tu correo electrónico"
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <div className="input-group">
          <span className="input-group-text" aria-hidden="true">
            <img
              src={password_icon}
              alt="Ícono de contraseña"
              width="20"
              height="20"
              aria-label="Ícono de contraseña"
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
            aria-label="Introduce tu contraseña"
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className="btn btn-primary"
          aria-label="Enviar formulario de inicio de sesión"
        >
          Ingresar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onRegister}
          aria-label="Ir al formulario de registro"
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
