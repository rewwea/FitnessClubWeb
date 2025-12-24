import prisma from '../utils/prisma.js'

class StatsRepository {
	async countClients() {
		console.log('[STATS REPO] countClients')
		return prisma.client.count()
	}

	async countActiveClients() {
		console.log('[STATS REPO] countActiveClients')
		return prisma.client.count({
			where: { isActive: true },
		})
	}

	async countActiveSubscriptions() {
		console.log('[STATS REPO] countActiveSubscriptions')
		return prisma.clientSubscription.count({
			where: { isActive: true },
		})
	}

	async countVisits() {
		console.log('[STATS REPO] countVisits')
		return prisma.visit.count()
	}

	async countVisitsByDate(start, end) {
		console.log('[STATS REPO] countVisitsByDate', start, end)

		return prisma.visit.groupBy({
			by: ['visitDate'],
			where: {
				visitDate: {
					gte: start,
					lte: end,
				},
			},
			_count: {
				id: true,
			},
			orderBy: {
				visitDate: 'asc',
			},
		})
	}

	async topClients(limit = 5) {
		console.log('[STATS REPO] topClients')

		return prisma.visit.groupBy({
			by: ['clientId'],
			_count: {
				clientId: true,
			},
			orderBy: {
				_count: {
					clientId: 'desc',
				},
			},
			take: limit,
		})
	}

	async clientsWithoutActiveSubscription() {
		console.log('[STATS REPO] clientsWithoutActiveSubscription')

		return prisma.client.findMany({
			where: {
				subscriptions: {
					none: {
						isActive: true,
					},
				},
			},
		})
	}

	async subscriptionsExpiringBefore(date) {
		console.log('[STATS REPO] subscriptionsExpiringBefore', date)

		return prisma.clientSubscription.findMany({
			where: {
				isActive: true,
				endDate: {
					lte: date,
				},
			},
			include: {
				client: true,
				type: true,
			},
			orderBy: {
				endDate: 'asc',
			},
		})
	}
}

export default new StatsRepository()
