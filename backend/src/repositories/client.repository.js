import prisma from '../utils/prisma.js'

const create = async data => {
	console.log('[CLIENT REPOSITORY] create:', data)

	return prisma.client.create({
		data,
	})
}

const findAll = async () => {
	console.log('[CLIENT REPOSITORY] findAll')

	return prisma.client.findMany()
}

const findById = async id => {
	console.log('[CLIENT REPOSITORY] findById:', id)

	return prisma.client.findUnique({
		where: { id },
	})
}

const update = async (id, data) => {
	console.log('[CLIENT REPOSITORY] update:', id, data)

	return prisma.client.update({
		where: { id },
		data,
	})
}

const remove = async id => {
	console.log('[CLIENT REPOSITORY] remove:', id)

	return prisma.client.delete({
		where: { id },
	})
}

export default {
	create,
	findAll,
	findById,
	update,
	remove,
}
