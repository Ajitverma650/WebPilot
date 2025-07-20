// routes/generateRoute.js
const express = require('express');
const router = express.Router();
const model = require('../config/genai');
const validateAndFixFiles = require('../utils/validateFiles');

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const enhancedPrompt = `
Generate a complete web application based on: "${prompt}"
Return response in this JSON format:
{
  "files": {
    "index.html": "...",
    "styles.css": "...",
    "script.js": "..."
  }
}`;

    const result = await model.generateContent(enhancedPrompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI did not return valid JSON");

    const parsed = JSON.parse(jsonMatch[0]);
    const validatedFiles = validateAndFixFiles(parsed.files);

    res.json({ files: validatedFiles });

  } catch (err) {
    console.error('Generate error:', err.message);
    res.status(500).json({ error: 'Failed to generate web app' });
  }
});

module.exports = router;
