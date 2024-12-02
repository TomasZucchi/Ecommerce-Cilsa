import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Nuestros Productos</h1>
      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Precio: ${product.price}</Card.Text>
                <Button variant="primary">Agregar al carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
