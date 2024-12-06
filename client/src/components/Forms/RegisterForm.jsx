import React, { useState, useEffect } from "react";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

function RegisterForm({
  onClose,
  onSuccess,
  onError,
  onLogin,
  formData,
  setFormData,
}) {
  const [nombre, setNombre] = useState(formData.nombre);
  const [apellido, setApellido] = useState(formData.apellido);
  const [email, setEmail] = useState(formData.email);
  const [password, setPassword] = useState(formData.password);

  useEffect(() => {
    setFormData({ nombre, apellido, email, password });
  }, [nombre, apellido, email, password, setFormData]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, email, password }), // Incluir apellido
      });

      if (response.ok) {
        const data = await response.json();
        onSuccess(`${data.nombre} ${data.apellido}`); // Pasar nombre completo a la función de éxito
        onClose(); // Cerrar el modal de registro
      } else {
        const errorData = await response.json();
        console.error("Register failed:", errorData);
        onError("Error al registrarse:\n" + errorData.message); // Manejar el error
      }
    } catch (error) {
      console.error("Error:", error);
      onError("Ocurrió un error, intenta nuevamente."); // Manejar errores de red
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
        <label htmlFor="apellido" className="form-label">
          Apellido
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <img src={user_icon} alt="User Icon" width="20" height="20" />
          </span>
          <input
            type="text"
            className="form-control"
            id="apellido"
            placeholder="Apellido"
            required
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
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
