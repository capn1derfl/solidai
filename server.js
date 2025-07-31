import path from "path";
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

// Serve static files (your index.html, css, js)
app.use(express.static(path.resolve()));

// Health check endpoint
app.get("/health", (req, res) => {
  res.send("✅ SolidAI is running and ready for chat requests.");
});

// Chat API endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are SolidAI, a sovereign AI agent working with decentralized technology and truth verification." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "No response from AI.";
    res.json({ reply: aiMessage });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
});

app.listen(PORT, () => console.log(`🚀 SolidAI live on port ${PORT}`));
