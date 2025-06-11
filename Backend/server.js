const express = require('express');
const cors = require('cors');
const GeminiController = require('./AI-Controller-Logic/GeminiController');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // native body parsing

app.post('/interview', async (req, res) => {
  const { history } = req.body;
  console.log("🔹 Incoming history:", JSON.stringify(history, null, 2)); // Log input

  try {
    const responseText = await GeminiController.respond(history);
    console.log("🔸 Gemini reply:", responseText); // Log Gemini's output

    res.json({ text: responseText });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'Failed to get AI response.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
