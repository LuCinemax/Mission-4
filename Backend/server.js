// Import required packages
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const GeminiController = require('./AI-Controller-Logic/GeminiController');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Use port from environment or default to 3001
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Fallback route for SPA
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// API endpoint for AI interview interaction
app.post('/interview', async (req, res) => {
  const { history } = req.body;
  try {
    const responseText = await GeminiController.respond(history);
    res.json({ text: responseText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get AI response.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
