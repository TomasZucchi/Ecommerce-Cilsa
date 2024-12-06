const express = require("express");
const router = express.Router();
const DetallePedido = require("../models/DetallePedido");
const Producto = require("../models/product"); // Asegúrate de que la ruta y el nombre del archivo sean correctos

router.post("/detalle_pedido", async (req, res) => {
  try {
    const { idUsuario, productos } = req.body;

    // Calcular el total
    let total = 0;
    for (const item of productos) {
      const producto = await Producto.findById(item.idProducto);
      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      total += producto.precio * item.cantidad;
    }

    const nuevoDetallePedido = new DetallePedido({
      idUsuario,
      productos,
      total,
    });

    await nuevoDetallePedido.save();
    res.status(201).json(nuevoDetallePedido);
  } catch (error) {
    console.error("Error al crear el detalle del pedido:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
