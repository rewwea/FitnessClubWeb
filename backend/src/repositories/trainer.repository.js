const prisma = require('../utils/prisma');

const createTrainer = (data) => {
  return prisma.trainer.create({ data });
};

const getAllTrainers = () => {
  return prisma.trainer.findMany();
};

module.exports = {
  createTrainer,
  getAllTrainers,
};