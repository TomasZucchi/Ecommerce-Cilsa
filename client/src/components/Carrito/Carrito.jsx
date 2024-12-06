import React from "react";
import Modal from "react-bootstrap/Modal";

function DetalleCarrito({ show, onHide, pedidos }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Pedidos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pedidos.length > 0 ? (
          <ul>
            {pedidos.map((pedido, index) => (
              <li key={index}>{pedido}</li>
            ))}
          </ul>
        ) : (
          <p>No hay pedidos en el carrito.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleCarrito;
