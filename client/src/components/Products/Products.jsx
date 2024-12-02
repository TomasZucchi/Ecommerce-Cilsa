import React, { useState, useEffect } from "react";
import { Card, CardGroup, Container } from "react-bootstrap";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Reemplaza 'URL_DE_TU_API' con la URL de tu API
    axios
      .get("URL_DE_TU_API")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <Container>
      <CardGroup>
        {products.map((product) => (
          <Card key={product.id} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </Container>
  );
};

export default Products;
