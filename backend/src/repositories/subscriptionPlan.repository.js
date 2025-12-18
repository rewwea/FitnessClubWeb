import prisma from '../utils/prisma.js'

export const getPlanById = (id) => {
  return prisma.subscriptionPlan.findUnique({
    where: { id }
  });
};