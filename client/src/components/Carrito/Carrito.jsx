import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DetalleCarrito({ show, onHide, pedidos }) {
  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (idProducto) => {
    // Filtrar el carrito para eliminar el producto seleccionado
    const nuevosPedidos = pedidos.filter((pedido) => pedido._id !== idProducto);
    onHide(nuevosPedidos); // Actualizar el carrito pasando los nuevos pedidos al modal
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Pedidos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pedidos.length > 0 ? (
          <ul>
            {pedidos.map((pedido) => (
              <li key={pedido._id}>
                {pedido.nombre} - Cantidad: {pedido.cantidad} - Precio: ${pedido.precio * pedido.cantidad}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => eliminarDelCarrito(pedido._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay pedidos en el carrito.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleCarrito;