const { sendMessage, getMessages } = require("../controllers/chatController");

module.exports = async (req, res) => {
  // CORS headers
  const corsOrigin = process.env.CLIENT_URL || "http://localhost:5173";
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "POST" && req.url === "/send") {
      await sendMessage(req, res);
    } else if (req.method === "GET" && req.url === "/messages") {
      await getMessages(req, res);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
