const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
});

const CategoriaModel = mongoose.model("Categorias", categoriaSchema);

module.exports = { CategoriaModel };