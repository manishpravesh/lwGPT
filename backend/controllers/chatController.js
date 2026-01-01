import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../lib/prisma.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Retry wrapper for database operations
const withRetry = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      // Wait before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 100));
    }
  }
};

export const chatWithAI = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    const userId = req.user.id;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Create or get chat with retry
    let chat;
    try {
      if (chatId) {
        // Verify ownership
        chat = await withRetry(() =>
          prisma.chat.findFirst({
            where: {
              id: chatId,
              userId: userId,
            },
          })
        );
        if (!chat) {
          return res
            .status(403)
            .json({ error: "Chat not found or unauthorized" });
        }
      } else {
        // Create new chat
        chat = await withRetry(() =>
          prisma.chat.create({
            data: {
              userId: userId,
              title: message.substring(0, 50), // Use first 50 chars as title
            },
          })
        );
      }
    } catch (dbErr) {
      console.error("Database error in chat creation:", dbErr.message);
      return res
        .status(503)
        .json({ error: "Database temporarily unavailable" });
    }

    // Save user message with retry
    try {
      await withRetry(() =>
        prisma.message.create({
          data: {
            chatId: chat.id,
            role: "user",
            content: message,
          },
        })
      );
    } catch (dbErr) {
      console.error("Database error saving user message:", dbErr.message);
    }

    // Get AI response
    let response;
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });
      const result = await model.generateContent(message);
      response = result.response.text();
    } catch (aiErr) {
      console.error("AI generation error:", aiErr.message);
      return res
        .status(503)
        .json({ error: "AI service temporarily unavailable" });
    }

    // Save AI message with retry
    try {
      await withRetry(() =>
        prisma.message.create({
          data: {
            chatId: chat.id,
            role: "assistant",
            content: response,
          },
        })
      );
    } catch (dbErr) {
      console.error("Database error saving AI message:", dbErr.message);
      // Still return the response even if we can't save it
    }

    return res.json({
      reply: response,
      chatId: chat.id,
    });
  } catch (err) {
    console.error("Chat error:", err.message);
    return res.status(500).json({ error: "Failed to process message" });
  }
};

export default chatWithAI;
