import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";

const Products = ({ products }) => {
  return (
    <Container id="productos">
      <h1 className="my-4">Nuestros Productos</h1>
      {/* Ajusta el espaciado horizontal entre columnas */}
      <Row className="gx-4">
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={3} className="mb-4">
            {/* Aplica estilos personalizados para hacer las tarjetas más pequeñas */}
            <Card style={{ width: "15rem", height: "24rem" }}>
              <Card.Img
                variant="top"
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.nombre}
                style={{ height: "8rem", objectFit: "cover" }} // Ajusta la altura de la imagen
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>{product.nombre}</Card.Title>
                <Card.Text style={{ fontSize: "0.9rem", height: "4rem", overflow: "hidden" }}>
                  {product.descripcion}
                </Card.Text>
                <Card.Text>
                  <strong style={{ fontSize: "0.9rem" }}>Precio: ${product.precio}</strong>
                </Card.Text>
                <Card.Text style={{ fontSize: "0.8rem" }}>Stock: {product.stock}</Card.Text>
                <Button variant="primary" size="sm">
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