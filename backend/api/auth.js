const express = require("express");
const { login, register } = require("../auth/authUtils");

module.exports = async (req, res) => {
  const app = express();
  app.use(express.json());

  app.post("/login", login);
  app.post("/register", register);

  app(req, res);
};
