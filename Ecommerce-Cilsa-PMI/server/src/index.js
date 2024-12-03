const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const { Schema, model } = mongoose;

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Agrega la ruta de los usuarios
app.use("/api", userRouter);

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
  console.log("Ctrl+C to stop the server");
});
