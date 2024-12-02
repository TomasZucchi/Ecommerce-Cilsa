import React from "react";
import user_icon from "../../assets/person.png";
import password_icon from "../../assets/password.png";
import email_icon from "../../assets/email.png";

function LoginForm({ onRegister }) {
  return (
    <form>
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
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onRegister} // Llama a la función para abrir el modal de registro
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
