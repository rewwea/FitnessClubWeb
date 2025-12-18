const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainer.controller');

router.post('/', trainerController.createTrainer);
router.get('/', trainerController.getAllTrainers);

module.exports = router;