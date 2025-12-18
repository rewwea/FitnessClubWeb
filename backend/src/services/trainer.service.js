import trainerRepo from '../repositories/trainer.repository.js';

const createTrainer = ({ name, specialty }) => {
  if (!name || !specialty) {
    throw new Error('Name and specialty are required');
  }

  return trainerRepo.createTrainer({ name, specialty });
};

const getAllTrainers = () => {
  return trainerRepo.getAllTrainers();
};

export default {
  createTrainer,
  getAllTrainers,
};