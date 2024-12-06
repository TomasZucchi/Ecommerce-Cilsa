const mongoose = require("mongoose");

const detallePedidoSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  productos: [
    {
      idProducto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      cantidad: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
});

const DetallePedido = mongoose.model("DetallePedido", detallePedidoSchema);

module.exports = DetallePedido;
