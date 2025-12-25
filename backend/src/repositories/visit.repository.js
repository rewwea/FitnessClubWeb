import prisma from '../utils/prisma.js'

class VisitRepository {
	async create(clientId, trainerId = null) {
		console.log(
			'[VISIT REPOSITORY] create visit for client:',
			clientId,
			'trainer:',
			trainerId
		)

		const data = { clientId }
		if (trainerId !== null && trainerId !== undefined)
			data.trainerId = trainerId

		return prisma.visit.create({
			data,
		})
	}

	async findByClient(clientId) {
		console.log('[VISIT REPOSITORY] findByClient:', clientId)

		return prisma.visit.findMany({
			where: { clientId },
			orderBy: { visitDate: 'desc' },
		})
	}

	async countByClient(clientId) {
		console.log('[VISIT REPOSITORY] countByClient:', clientId)

		return prisma.visit.count({
			where: { clientId },
		})
	}
}

export default new VisitRepository()
