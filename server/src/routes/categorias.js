const express = require("express");
const { ProductModel } = require("../models/product"); // Asegúrate de que la ruta sea correcta
const router = express.Router();

// Ruta para obtener productos de una categoría
router.get("/:categoria_id/productos", async (req, res) => {
  try {
    const categoriaId = req.params.categoria_id; // Accede al parámetro correctamente

    if (!categoriaId) {
      return res.status(400).json({ message: "Se requiere un categoria_id válido" });
    }

    // Consulta los productos que tienen la categoría especificada
    const productos = await ProductModel.find({ categoria_id: categoriaId })
      .populate("categoria_id", "nombre descripcion"); // Poblamos la categoría asociada

    if (!productos || productos.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos para esta categoría" });
    }

    res.json(productos); // Devuelve los productos encontrados
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
});

module.exports = router;