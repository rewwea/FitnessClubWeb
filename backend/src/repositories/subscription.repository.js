import prisma from '../utils/prisma.js'

export const createSubscription = (data) => {
  return prisma.subscription.create({ data });
};

export const getClientSubscriptions = (clientId) => {
  return prisma.subscription.findMany({
    where: { clientId },
    include: { plan: true }
  });
};