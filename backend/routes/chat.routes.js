import express from "express";
import chatWithAI from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import usageLimit from "../middleware/usageLimit.js";
import prisma from "../lib/prisma.js";

const router = express.Router();

/**
 * POST /api/chat
 */
router.post("/chat", authMiddleware, usageLimit("chat"), chatWithAI);

/**
 * GET /api/chats
 */
router.get("/chats", authMiddleware, async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    res.json(chats);
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

/**
 * GET /api/chats/:id
 */
router.get("/chats/:id", authMiddleware, async (req, res) => {
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json(chat);
  } catch (err) {
    console.error("Error fetching chat:", err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

export default router;
