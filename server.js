const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const OpenAI = require("openai"); // ✅ NEW syntax for v4

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 🔐 set this in Render
});

app.get("/", (req, res) => {
  res.send("✅ NexoraBot backend is running.");
});

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI API error:", err.message);
    res.status(500).json({ reply: "⚠️ NexoraBot had an issue." });
  }
});

app.listen(port, () => {
  console.log(`🚀 NexoraBot backend running on port ${port}`);
});
