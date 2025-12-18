const trainerService = require('../services/trainer.service');

const createTrainer = async (req, res) => {
  try {
    const trainer = await trainerService.createTrainer(req.body);
    res.status(201).json(trainer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllTrainers = async (req, res) => {
  const trainers = await trainerService.getAllTrainers();
  res.json(trainers);
};

module.exports = {
  createTrainer,
  getAllTrainers,
};