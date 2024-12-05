import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../Products/Products";

const ProductList = ({ filter, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solicitar productos con filtro de categoría (si se pasa un filtro)
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:3001/api/productos"; // URL base

        // Si hay filtro de categoría, agregarlo a la URL
        if (filter) {
          url = `${url}?categoria=${filter}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter]); // Se vuelve a hacer la solicitud solo cuando el filtro cambia

  useEffect(() => {
    let filtered = products;

    // Filtro por nombre (búsqueda)
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products]); // Vuelve a aplicar los filtros cuando cambia la búsqueda o los productos

  if (loading) {
    return <p>Cargando productos...</p>;
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