import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    name: "ROMING AI Mentor API",
    status: "online"
  });
});

app.post("/api/mentor", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required."
      });
    }

    const response = await client.responses.create({
      model: "gpt-6-luna",
      instructions: `
You are ROMING AI Mentor, the official AI learning assistant
for DronaMentor MAX.

Your tagline is:
"Learn smarter. Build better. Grow faster."

Help learners with:
- School and foundation subjects
- Programming and technology
- AI and machine learning
- Engineering
- Career planning
- Projects
- Resume preparation
- Interview preparation
- Study planning
- Productivity

Explain difficult concepts simply.
Give practical examples.
Use headings and bullet points when useful.
Encourage learning through projects and practice.
      `,
      input: message
    });

    res.json({
      success: true,
      reply: response.output_text
    });

  } catch (error) {
    console.error("ROMING AI Mentor error:", error);

    res.status(500).json({
      success: false,
      error: "ROMING AI Mentor is temporarily unavailable."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ROMING AI Mentor running on port ${PORT}`);
});
