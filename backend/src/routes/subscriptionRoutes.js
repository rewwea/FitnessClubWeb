const express = require('express');
const router = express.Router();

const {
  calculateEndDate,
  checkAccessMock,
} = require('../services/subscriptionService');

router.post('/calculate', (req, res) => {
  const { startDate, durationDays } = req.body;

  if (!startDate || durationDays <= 0) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const endDate = calculateEndDate(new Date(startDate), durationDays);

  res.json({
    startDate,
    durationDays,
    endDate,
  });
});

router.post('/check-access', (req, res) => {
  const { startDate, endDate } = req.body;

  const hasAccess = checkAccessMock({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  res.json({ access: hasAccess });
});

module.exports = router;