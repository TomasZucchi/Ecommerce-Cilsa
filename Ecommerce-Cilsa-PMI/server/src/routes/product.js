const { Router } = require("express");
const { ProductModel } = require("../models/product");

const router = Router();

// Obtener todos los productos
router.get("/productos", async (req, res) => {  // Cambié "/products" por "/productos"
  try {
    // Obtiene todos los productos de la base de datos
    const products = await ProductModel.find();

    // Manejo de caso cuando no hay productos
    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No se encontraron productos.",
      });
    }

    // Devuelve los productos en formato JSON
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    // Respuesta de error del servidor
    res.status(500).json({
      message: "Error del servidor al obtener los productos.",
      details: error.message,
    });
  }
});

module.exports = router;