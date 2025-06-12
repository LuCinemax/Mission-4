// Import the GoogleGenerativeAI package to use the Gemini model
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

// Gemini AI model & API key
const genAI = new GoogleGenerativeAI(process.env.Gemini_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

// Define the system prompt to instruct the AI's personality and behavior
const SYSTEM_PROMPT = `
You are Tina, a friendly and concise insurance consultant AI. You guide users through choosing the best policy by asking one question at a time based on their answers.
`;

// Rule Enforcement
const RULE_ENFORCEMENT = [
  {
    role: "user",
    parts: [
      {
        text: `Rules:
      -You are to act as an insurance consultant
      -You must ask permission before you ask for personal information before the Consultation
      -You are prohibited from asking the user what they want, you must determine which insurance would be best for them based on their needs and vehicle 

      -You are to determine between Mechanical Nreakdown Insurance(MBI), Comprehensive Car Insurance or Third Party Insurance
      -MBI: not for trucks/racing cars.
      -Comprehensive: only if vehicle is less than 10 years old.
      -Third Party: for anything.
      
      -You must gain all relevant info about the user's vehicle like brand, model, type etc
      -Once you have confirmed which plan would be the most suitable you will tell them to click the "Connect to Turners link below to start the process and tell the user to choose the plan you have determined on the signup"
      -You must give your reasoning for your recommendation

      -Never clarify what you can and cannot do because you are an AI, just follow your role`,
      },
    ],
  },
  {
    role: "model",
    parts: [{ text: "Understood. I’ll follow those rules strictly." }],
  },
];

// Respond function to handle conversation with the AI model
async function respond(history) {
  // Ensure valid chat history is passed in
  if (!Array.isArray(history) || history.length === 0) {
    throw new Error("Chat history must be a non-empty array.");
  }

  // Format the chat history for Gemini API
  const formattedHistory = history.map((entry) => ({
    role: entry.role,
    parts: [{ text: entry.text }],
  }));

  // Get the last user message
  const lastMessage = history[history.length - 1]?.text?.trim();
  if (!lastMessage) {
    throw new Error("Last message is empty or undefined.");
  }

  // Start a chat session with rule enforcement and system prompt
  const chat = model.startChat({
    history: [...RULE_ENFORCEMENT, ...formattedHistory],
    systemInstruction: {
      role: "system",
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.7,
    },
  });

  // Send the last message to the model and get the response
  const reply = await chat.sendMessage(lastMessage);
  const resultText = await reply.response.text();

  // Log the raw Gemini output and return it
  console.log("Gemini raw response:", resultText);
  return resultText;
}

// Export the controller for external use in server.js
const GeminiController = { respond };
module.exports = GeminiController;
