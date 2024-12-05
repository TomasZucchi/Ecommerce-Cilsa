const express = require("express");
const { ProductModel } = require("../models/product");  // Verifica la ruta del modelo
const router = express.Router();

// Ruta para obtener productos de una categoría
router.get("/:categoryId/productos", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;  // Obtén el categoryId de los parámetros
    if (!categoryId) {
      return res.status(400).json({ message: "Se requiere un categoryId válido" });
    }
    const productos = await ProductModel.find({ categoria_id: categoryId });  // Consulta en la base de datos
    if (!productos) {
      return res.status(404).json({ message: "No se encontraron productos para esta categoría" });
    }
    res.json(productos);  // Devuelve los productos encontrados
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
});

module.exports = router;