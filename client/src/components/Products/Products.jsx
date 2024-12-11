import React, { useContext } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../../UserContext";

const Products = ({ products }) => {
  const { user } = useContext(UserContext);

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert("Por favor inicia sesión para agregar productos al carrito.");
      console.error("Usuario no autenticado");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/detalle_pedido",
        {
          idUsuario: user._id,
          productos: [{ idProducto: productId, cantidad: 1 }],
        }
      );
      console.log("Producto agregado al carrito:", response.data);
      alert("Producto agregado al carrito.");
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      alert("Error al agregar el producto al carrito.");
    }
  };

  return (
    <Container id="productos">
      <h1 className="my-4 text-center">Nuestros Productos</h1>
      <Row className="gx-4 justify-content-center">
        {products.map((product) => (
          <Col
            key={product._id}
            sm={12}
            md={6}
            lg={3}
            className="mb-4 d-flex justify-content-center"
          >
            <Card style={{ width: "15rem", height: "24rem" }}>
              <Card.Img
                variant="top"
                src={product.imagen_url || "https://via.placeholder.com/150"}
                alt={`Imagen del producto ${product.nombre}`}
                aria-label={`Imagen del producto ${product.nombre}`}
                style={{
                  height: "8.2rem",
                  width: "auto",
                  objectFit: "contain",
                  padding: "0.5rem",
                }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }} aria-label={`Nombre: ${product.nombre}`}>
                  {product.nombre}
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "0.9rem",
                    height: "4rem",
                    overflow: "hidden",
                  }}
                  aria-label={`Descripción: ${product.descripcion}`}
                >
                  {product.descripcion}
                </Card.Text>
                <Card.Text aria-label={`Precio: ${product.precio}`}>
                  <strong style={{ fontSize: "0.9rem" }}>
                    Precio: ${product.precio}
                  </strong>
                </Card.Text>
                <Card.Text style={{ fontSize: "0.8rem" }} aria-label={`Stock disponible: ${product.stock}`}>
                  Stock: {product.stock}
                </Card.Text>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddToCart(product._id)}
                  aria-label={`Agregar ${product.nombre} al carrito`}
                >
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
