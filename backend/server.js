const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5001;

const cors = require('./middleware/corsConfig');
const generateRoute = require('./routes/generateRoute');
const publishRoutes = require('./routes/publishRoutes');

app.use(cors);
app.use(express.json({ limit: '10mb' }));
app.use('/api/generate', generateRoute);
app.use('/api/publish', publishRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error("Server error:", err);
});
