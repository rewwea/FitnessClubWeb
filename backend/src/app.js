const express = require('express');
const cors = require('cors');

const app = express();

const subscriptionRoutes = require('./routes/subscriptionRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/subscriptions', subscriptionRoutes);

// Тестовый эндпоинт
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Fitness Club API is running'
  });
});

module.exports = app;