import prisma from '../utils/prisma.js';

const createTrainer = (data) => {
  return prisma.trainer.create({ data });
};

const getAllTrainers = () => {
  return prisma.trainer.findMany();
};

export default {
  createTrainer,
  getAllTrainers,
};