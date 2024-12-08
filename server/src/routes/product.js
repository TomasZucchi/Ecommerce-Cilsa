const { Router } = require("express");
const ProductModel = require("../models/product");

const router = Router();

// Obtener todos los productos
router.get("/productos", async (req, res) => {
  try {
    console.log("Consultando productos...");
    const products = await ProductModel.find();

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No se encontraron productos.",
      });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({
      message: "Error del servidor al obtener los productos.",
      details: error.message,
    });
  }
});

module.exports = router;