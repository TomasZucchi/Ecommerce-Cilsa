import "./LoginSignup.css";

import user_icon from "../assets/person.png";
import password_icon from "../assets/password.png";
import email_icon from "../assets/email.png";

const LoginSignup = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text"> Iniciar sesión</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <img src={user_icon} alt="" />
        <input type="text" />
      </div>
      <div className="inputs">
        <img src={email_icon} alt="" />
        <input type="email" />
      </div>
      <div className="inputs">
        <img src={password_icon} alt="" />
        <input type="password" />
      </div>
      <div className="submit-container">
        <div className="submit">Registrarse</div>
        <div className="submit">Iniciar sesión</div>
      </div>
    </div>
  );
};

export default LoginSignup;
