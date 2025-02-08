import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key is missing" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      }
    );

    if (!response.data || !response.data.candidates) {
      throw new Error("Invalid response from Gemini API");
    }

    const botReply = response.data.candidates[0].content.parts[0].text;
    return res.status(200).json({
      messages: [
        { sender: "user", text: message, avatar: "/bot/bot.jpg" },
        { sender: "bot", text: botReply, avatar: "/profile/pro.jpg" },
      ],
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to get response from Gemini API",
      details: error.response?.data || error.message,
    });
  }
}
