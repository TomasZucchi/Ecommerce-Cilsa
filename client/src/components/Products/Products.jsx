import React, { useContext } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../../UserContext";

const Products = ({ products }) => {
  return (
    <Container id="productos">
      <h1 className="my-4">Nuestros Productos</h1>
      <Row className="gx-4">
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={3} className="mb-4">
            <Card style={{ width: "15rem", height: "24rem" }}>
              <Card.Img
                variant="top"
                src={product.imagen_url || "https://via.placeholder.com/150"}
                alt={product.nombre}
                style={{
                  height: "8.2rem", 
                  width: "auto", 
                  objectFit: "contain", 
                  padding: "0.5rem",
                }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>
                  {product.nombre}
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "0.9rem",
                    height: "4rem",
                    overflow: "hidden",
                  }}
                >
                  {product.descripcion}
                </Card.Text>
                <Card.Text>
                  <strong style={{ fontSize: "0.9rem" }}>
                    Precio: ${product.precio}
                  </strong>
                </Card.Text>
                <Card.Text style={{ fontSize: "0.8rem" }}>
                  Stock: {product.stock}
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
