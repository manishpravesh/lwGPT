import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const result = await model.generateContent(message);
    const response = result.response.text();

    return res.json({
      reply: response,
    });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ error: "AI service failed" });
  }
};

export default chatWithAI;
