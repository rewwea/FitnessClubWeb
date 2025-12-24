import statsRepository from '../repositories/stats.repository.js'

class StatsService {
	async getSummary() {
		console.log('[STATS SERVICE] getSummary')

		const [totalClients, activeClients, activeSubscriptions, totalVisits] =
			await Promise.all([
				statsRepository.countClients(),
				statsRepository.countActiveClients(),
				statsRepository.countActiveSubscriptions(),
				statsRepository.countVisits(),
			])

		return {
			totalClients,
			activeClients,
			activeSubscriptions,
			clientsWithoutSubscription: activeClients - activeSubscriptions,
			totalVisits,
		}
	}

	async getVisitsByDays(days = 7) {
		console.log('[STATS SERVICE] getVisitsByDays', days)

		const end = new Date()
		const start = new Date()
		start.setDate(end.getDate() - days)

		const data = await statsRepository.countVisitsByDate(start, end)

		return data.map(item => ({
			date: item.visitDate.toISOString().split('T')[0],
			count: item._count.id,
		}))
	}

	async getTopClients(limit = 5) {
		console.log('[STATS SERVICE] getTopClients')

		const raw = await statsRepository.topClients(limit)

		return raw.map(item => ({
			clientId: item.clientId,
			visitsCount: item._count.clientId,
		}))
	}

	async getClientsWithoutSubscription() {
		console.log('[STATS SERVICE] getClientsWithoutSubscription')

		return statsRepository.clientsWithoutActiveSubscription()
	}

	async getExpiringSubscriptions(days = 7) {
		console.log('[STATS SERVICE] getExpiringSubscriptions', days)

		const date = new Date()
		date.setDate(date.getDate() + days)

		return statsRepository.subscriptionsExpiringBefore(date)
	}
}

export default new StatsService()
