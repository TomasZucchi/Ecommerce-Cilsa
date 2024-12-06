const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/categorias"); // Ruta de categorías
const { ProductModel } = require("./models/product");
const detallePedidoRouter = require("./routes/DetallePedido");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Conexión con MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Rutas
app.use("/api", userRouter); // Rutas de usuarios
app.use("/api", productRouter); // Rutas de productos
app.use("/api/categorias", categoryRouter); // Rutas de categorías
app.use("/api", detallePedidoRouter);

// Ruta de depuración (opcional)
app.get("/debug/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    console.log("Productos obtenidos:", products);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Iniciar el servidor
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
