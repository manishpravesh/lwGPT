import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../lib/prisma.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt focused on Indian Law
const SYSTEM_PROMPT = `You are an expert legal assistant specializing in Indian Law. Your role is to:

1. Provide accurate information about Indian laws, acts, sections, and legal procedures
2. Help users understand their rights and responsibilities under Indian law
3. Explain complex legal concepts in simple, understandable language
4. Refer to specific sections of relevant acts like:
   - Indian Penal Code (IPC)
   - Criminal Procedure Code (CrPC)
   - Civil Procedure Code (CPC)
   - Indian Constitution
   - Contract Act
   - Tort Law
   - And other relevant Indian statutes

5. Always disclaimer that you're providing legal information, not legal advice
6. Encourage users to consult qualified lawyers for specific legal matters
7. Focus exclusively on Indian legal matters - politely redirect if asked about other jurisdictions

Important:
- Always maintain context from previous messages in the conversation
- Be professional, accurate, and helpful
- Keep responses concise but comprehensive
- If uncertain about a law, state it clearly

Remember: This is legal information, not legal advice. Users should consult qualified lawyers for their specific situations.`;

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

    // Get all previous messages in this chat for context
    let previousMessages = [];
    try {
      previousMessages = await withRetry(() =>
        prisma.message.findMany({
          where: {
            chatId: chat.id,
          },
          orderBy: {
            createdAt: "asc",
          },
        })
      );
    } catch (dbErr) {
      console.error("Database error fetching chat history:", dbErr.message);
    }

    // Build conversation history for Gemini
    const conversationHistory = previousMessages
      .filter((msg) => msg.role !== "system") // Filter out system messages
      .map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    // Add the new user message to conversation history
    conversationHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Get AI response with full conversation context
    let response;
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      // Start a chat session with history
      const chat_session = model.startChat({
        history: conversationHistory.slice(0, -1), // All messages except the last one
      });

      const result = await chat_session.sendMessage(message);
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
