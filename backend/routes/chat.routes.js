import express from "express";
import chatWithAI from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import usageLimit from "../middleware/usageLimit.js";

const router = express.Router();

router.post("/chat", authMiddleware, usageLimit("chat"), chatWithAI);

export default router;
