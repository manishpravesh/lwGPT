const express = require("express");
const cors = require("cors");
const { sendMessage, getMessages } = require("../controllers/chatController");

module.exports = async (req, res) => {
  const app = express();

  // CORS configuration
  const corsOrigin = process.env.CLIENT_URL || "http://localhost:5173";
  app.use(
    cors({
      origin: corsOrigin,
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
      credentials: true,
    })
  );

  app.use(express.json());

  app.post("/send", sendMessage);
  app.get("/messages", getMessages);

  app(req, res);
};
