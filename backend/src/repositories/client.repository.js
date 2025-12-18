import prisma from '../utils/prisma.js'

export const createClient = (data) => {
  return prisma.client.create({ data });
};

export const getAllClients = () => {
  return prisma.client.findMany({
    include: { trainer: true }
  });
};

export const getClientById = (id) => {
  return prisma.client.findUnique({
    where: { id },
    include: { subscriptions: true }
  });
};