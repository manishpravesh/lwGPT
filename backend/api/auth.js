const express = require("express");
const cors = require("cors");
const { login, register } = require("../auth/authUtils");

module.exports = async (req, res) => {
  const app = express();

  // CORS configuration updated to allow credentials
  const corsOrigin = process.env.CLIENT_URL || "http://localhost:5173";
  app.use(
    cors({
      origin: corsOrigin,
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
      credentials: true,
    })
  );
  app.use(express.json());

  app.post("/login", login);
  app.post("/register", register);

  app(req, res);
};
