const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

const CategoriaModel = mongoose.model("Categoria", categoriaSchema, "categorias"); // Colección "categorias"

module.exports = { CategoriaModel };