const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.Gemini_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

const SYSTEM_PROMPT = `
You are Tina, an insurance consultant AI. You guide users through choosing the best insurance policy.
You must first ask for permission to ask personal questions.
Only then begin the interview by asking what type of vehicle they own.
Ask questions one at a time, based on the user's response.

You can recommend:
- Mechanical Breakdown Insurance (MBI): not for trucks or racing cars.
- Comprehensive Car Insurance: only for vehicles under 10 years old.
- Third Party Car Insurance: for anything.

NEVER ask "which do you want". Guide the user by asking questions about their situation and needs.

Be friendly, helpful, and concise.
`;

async function respond(history) {
  if (!Array.isArray(history) || history.length === 0) {
    throw new Error("Chat history must be a non-empty array.");
  }

  const formattedHistory = history.map(entry => ({
    role: entry.role,
    parts: [{ text: entry.text }]
  }));

  const lastMessage = history[history.length - 1]?.text?.trim();
  if (!lastMessage) {
    throw new Error("Last message is empty or undefined.");
  }

  const chat = model.startChat({
    history: formattedHistory,
    systemInstruction: {
      role: "system",
      parts: [{ text: SYSTEM_PROMPT }]
    },
    generationConfig: {
      temperature: 0.7
    }
  });

  const reply = await chat.sendMessage(lastMessage);
  const resultText = await reply.response.text();
  console.log("🔸 Gemini raw response:", resultText);
  return resultText;
}

const GeminiController = { respond };
module.exports = GeminiController;
