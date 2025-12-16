const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Тестовый эндпоинт
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Fitness Club API is running'
  });
});

module.exports = app;