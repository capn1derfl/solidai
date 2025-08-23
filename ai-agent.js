import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function askAI(question) {
  try {
    const response = await fetch("https://api.gemini.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gemini-1.5-mini",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error("Gemini AI error:", err);
    return "Error generating response from Gemini";
  }
}
