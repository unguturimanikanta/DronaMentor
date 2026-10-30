import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "ROMING AI Mentor API",
    status: "online",
    mode: "demo"
  });
});

app.post("/api/mentor", (req, res) => {
  const message = String(req.body?.message || "").trim().toLowerCase();

  if (!message) {
    return res.status(400).json({
      success: false,
      error: "Message is required."
    });
  }

  let reply;

  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    reply =
      "👋 Hi! I'm ROMING AI Mentor. I can help you with subjects, coding, careers, projects and interview preparation.";
  } else if (
    message.includes("career") ||
    message.includes("job") ||
    message.includes("roadmap")
  ) {
    reply =
      "🎯 Career Mode: Tell me your education, skills and target career. I'll help you build a step-by-step learning roadmap.";
  } else if (
    message.includes("project") ||
    message.includes("build")
  ) {
    reply =
      "🛠️ Project Mode: Choose a skill you're learning and I'll help you turn it into a practical project.";
  } else if (
    message.includes("interview") ||
    message.includes("question")
  ) {
    reply =
      "🎤 Interview Mode: I can give you practice questions, explain the answers and help you improve step by step.";
  } else if (
    message.includes("code") ||
    message.includes("coding") ||
    message.includes("program")
  ) {
    reply =
      "💻 Coding Mode: I can guide you through programming concepts, logic, debugging and project ideas.";
  } else if (
    message.includes("ai") ||
    message.includes("machine learning") ||
    message.includes("genai")
  ) {
    reply =
      "🤖 AI Learning Path: Start with Python → mathematics basics → machine learning → deep learning → generative AI → practical projects.";
  } else if (
    message.includes("explain") ||
    message.includes("learn") ||
    message.includes("subject")
  ) {
    reply =
      "📚 Learning Mode: Tell me the subject or topic you want to learn, and I'll help you break it into simple steps.";
  } else {
    reply =
      "🧠 I'm ROMING AI Mentor. I can currently guide you through learning, coding, AI, careers, projects and interviews. Try asking me one of those!";
  }

  res.json({
    success: true,
    reply
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ROMING AI Mentor running on port ${PORT}`);
});
