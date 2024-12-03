const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { UserErrors } = require("../error");

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validación manual
    if (!nombre || !email || !password) {
      return res.status(UserErrors.MISSING_FIELDS.statusCode).json({
        message: UserErrors.MISSING_FIELDS.message,
      });
    }

    if (
      nombre.length < 3 ||
      nombre.length > 20 ||
      !/^[a-zA-Z0-9]+$/.test(nombre)
    ) {
      return res.status(UserErrors.INVALID_USERNAME.statusCode).json({
        message: UserErrors.INVALID_USERNAME.message,
      });
    }

    if (!/.+@.+\..+/.test(email)) {
      return res.status(UserErrors.INVALID_EMAIL.statusCode).json({
        message: UserErrors.INVALID_EMAIL.message,
      });
    }

    if (password.length < 8) {
      return res.status(UserErrors.INVALID_PASSWORD.statusCode).json({
        message: UserErrors.INVALID_PASSWORD.message,
      });
    }

    // Verificar si el nombre de usuario ya existe
    const existingUserByName = await UserModel.findOne({ nombre });
    if (existingUserByName) {
      return res.status(UserErrors.USERNAME_EXISTS.statusCode).json({
        message: UserErrors.USERNAME_EXISTS.message,
      });
    }

    // Verificar si el correo electrónico ya existe
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return res.status(UserErrors.EMAIL_EXISTS.statusCode).json({
        message: UserErrors.EMAIL_EXISTS.message,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ nombre, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(UserErrors.SERVER_ERROR.statusCode).json({
      error: UserErrors.SERVER_ERROR.message,
      details: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(UserErrors.MISSING_FIELDS.statusCode).json({
        message: UserErrors.MISSING_FIELDS.message,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(UserErrors.USER_NOT_FOUND.statusCode).json({
        message: UserErrors.USER_NOT_FOUND.message,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(UserErrors.INVALID_CREDENTIALS.statusCode).json({
        message: UserErrors.INVALID_CREDENTIALS.message,
      });
    }
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.json({ message: "Inicio de sesión exitoso", token, userID: user._id });
  } catch (err) {
    res.status(UserErrors.SERVER_ERROR.statusCode).json({
      error: UserErrors.SERVER_ERROR.message,
      details: err.message,
    });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "secret", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = router;
