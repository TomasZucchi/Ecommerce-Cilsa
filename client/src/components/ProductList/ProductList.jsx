import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../Products/Products";

const ProductList = ({ filter, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Estado para manejo de errores

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(""); // Reseteamos el error antes de la nueva petición
      try {
        let url = "http://localhost:3001/api/productos"; // URL base

        if (filter) {
          url = `${url}?categoria=${filter}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Hubo un problema al cargar los productos.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter]); // Se vuelve a hacer la solicitud solo cuando el filtro cambia

  useEffect(() => {
    let filtered = products;

    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (loading) {
    return (
      <div className="container">
        <p>Cargando productos...</p>
        {/* Aquí puedes agregar un spinner para mejorar la UX */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      {filteredProducts.length > 0 ? (
        <Products products={filteredProducts} />
      ) : (
        <p>No se encontraron productos</p>
      )}
    </div>
  );
};

export default ProductList;