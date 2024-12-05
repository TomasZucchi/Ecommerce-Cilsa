const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  categoria_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria", // Referencia a la colección de categorías
    required: true,
  },
});

// Especificamos el nombre de la colección explícitamente
const ProductModel = mongoose.model("Product", productSchema, "productos");

module.exports = { ProductModel };