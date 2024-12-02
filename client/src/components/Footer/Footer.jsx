import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="bg-light text-center text-lg-start fixed-bottom mb-5"
      id="contacto"
    >
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-8 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Sobre Nosotros</h5>
            <p>
              PC Hard ofrece una amplia selección de productos de calidad,
              asegurando una excelente experiencia de compra.
            </p>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-lg-end">
            <h5 className="text-uppercase">Contáctanos</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark">
                  Correo: contacto@pchard.com
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Teléfono: +54 11 1111-1111
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Dirección: Av. ...
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3 bg-dark text-light fixed-bottom">
        © 2024 PC Hard. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
