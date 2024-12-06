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
      <h1 className="my-4">Nuestros Productos</h1>
      {/* Ajusta el espaciado horizontal entre columnas */}
      <Row className="gx-4">
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={3} className="mb-4">
            <Card style={{ width: "15rem", height: "24rem" }}>
              <Card.Img
                variant="top"
                src={product.imagen_url || "https://via.placeholder.com/150"} // Usar `imagen_url`
                alt={product.nombre}
                style={{
                  height: "8.2rem", // Reduce la altura
                  width: "auto", // Permite que se ajuste automáticamente al ancho
                  objectFit: "contain", // Asegura que la imagen se mantenga completa dentro del área
                  padding: "0.5rem", // Añade algo de espacio alrededor
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
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddToCart(product)}
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
