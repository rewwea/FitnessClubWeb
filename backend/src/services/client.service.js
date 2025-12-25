import clientRepository from '../repositories/client.repository.js'
import trainerRepository from '../repositories/trainer.repository.js'

/**
 * Создание клиента
 */

const createClient = async data => {
	console.log('[CLIENT SERVICE] createClient input:', data)

	const { firstName, lastName, email, phone, birthDate } = data

	// ===== ВАЛИДАЦИЯ =====
	if (!firstName || !lastName) {
		throw new Error('Имя и фамилия обязательны')
	}

	if (!email) {
		throw new Error('Email обязателен')
	}

	if (!phone) {
		throw new Error('Телефон обязателен')
	}

	// ===== СОЗДАНИЕ =====
	const createData = {
		firstName,
		lastName,
		email,
		phone,
		birthDate: birthDate ? new Date(birthDate) : null,
	}

	// optional trainer assignment
	if (data.trainerId) {
		const trainer = await trainerRepository.findById(Number(data.trainerId))
		if (!trainer || !trainer.isActive) {
			throw new Error('Указанный тренер не найден или неактивен')
		}
		createData.trainerId = Number(data.trainerId)
	}

	const client = await clientRepository.create(createData)

	console.log('[CLIENT SERVICE] created:', client)

	return client
}

const getAllClients = async () => {
	console.log('[CLIENT SERVICE] getAllClients')

	return clientRepository.findAll()
}

const getClientById = async id => {
	console.log('[CLIENT SERVICE] getClientById:', id)

	const client = await clientRepository.findById(Number(id))

	if (!client) {
		throw new Error('Клиент не найден')
	}

	return client
}

const updateClient = async (id, data) => {
	console.log('[CLIENT SERVICE] updateClient:', id, data)

	// if assigning trainer, validate
	if (data && data.trainerId !== undefined && data.trainerId !== null) {
		const trainer = await trainerRepository.findById(Number(data.trainerId))
		if (!trainer || !trainer.isActive) {
			throw new Error('Указанный тренер не найден или неактивен')
		}
		data.trainerId = Number(data.trainerId)
	}

	return clientRepository.update(Number(id), data)
}

const deleteClient = async id => {
	console.log('[CLIENT SERVICE] deleteClient:', id)

	return clientRepository.remove(Number(id))
}

export default {
	createClient,
	getAllClients,
	getClientById,
	updateClient,
	deleteClient,
}
