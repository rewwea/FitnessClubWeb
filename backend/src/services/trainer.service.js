const trainerRepo = require('../repositories/trainer.repository');

const createTrainer = ({ name, specialty }) => {
  if (!name || !specialty) {
    throw new Error('Name and specialty are required');
  }

  return trainerRepo.createTrainer({ name, specialty });
};

const getAllTrainers = () => {
  return trainerRepo.getAllTrainers();
};

module.exports = {
  createTrainer,
  getAllTrainers,
};