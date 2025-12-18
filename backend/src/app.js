const express = require('express');

const app = express();

app.use(express.json());

const trainerRoutes = require('./routes/trainer.routes');

app.use('/api/trainers', trainerRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;