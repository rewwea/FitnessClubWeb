import clientRepository from '../repositories/client.repository.js'

/**
 * Создание клиента
 */

const createClient = async (data) => {
  console.log('[CLIENT SERVICE] createClient input:', data);

  const {
    firstName,
    lastName,
    email,
    phone,
    birthDate
  } = data;

  // ===== ВАЛИДАЦИЯ =====
  if (!firstName || !lastName) {
    throw new Error('Имя и фамилия обязательны');
  }

  if (!email) {
    throw new Error('Email обязателен');
  }

  if (!phone) {
    throw new Error('Телефон обязателен');
  }

  // ===== СОЗДАНИЕ =====
  const client = await clientRepository.create({
    firstName,
    lastName,
    email,
    phone,
    birthDate: birthDate ? new Date(birthDate) : null
  });

  console.log('[CLIENT SERVICE] created:', client);

  return client;
};

const getAllClients = async () => {
  console.log('[CLIENT SERVICE] getAllClients');

  return clientRepository.findAll();
};

const getClientById = async (id) => {
  console.log('[CLIENT SERVICE] getClientById:', id);

  const client = await clientRepository.findById(Number(id));

  if (!client) {
    throw new Error('Клиент не найден');
  }

  return client;
};

const updateClient = async (id, data) => {
  console.log('[CLIENT SERVICE] updateClient:', id, data);

  return clientRepository.update(Number(id), data);
};

const deleteClient = async (id) => {
  console.log('[CLIENT SERVICE] deleteClient:', id);

  return clientRepository.remove(Number(id));
};

export default {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
};