const express = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");

module.exports = async (req, res) => {
  const app = express();
  app.use(express.json());

  app.post("/send", sendMessage);
  app.get("/messages", getMessages);

  app(req, res);
};
