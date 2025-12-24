import statsService from '../services/stats.service.js'

class StatsController {
	async summary(req, res) {
		console.log('[STATS CONTROLLER] GET /stats/summary')

		const data = await statsService.getSummary()
		res.json(data)
	}

	async visitsByDays(req, res) {
		console.log('[STATS CONTROLLER] GET /stats/visits-by-days')

		const days = Number(req.query.days || 7)
		const data = await statsService.getVisitsByDays(days)

		res.json(data)
	}

	async topClients(req, res) {
		console.log('[STATS CONTROLLER] GET /stats/top-clients')

		const limit = Number(req.query.limit || 5)
		const data = await statsService.getTopClients(limit)

		res.json(data)
	}

	async clientsWithoutSubscription(req, res) {
		console.log('[STATS CONTROLLER] GET /stats/clients-without-subscription')

		const data = await statsService.getClientsWithoutSubscription()
		res.json(data)
	}

	async expiringSubscriptions(req, res) {
		console.log('[STATS CONTROLLER] GET /stats/subscriptions-expiring')

		const days = Number(req.query.days || 7)
		const data = await statsService.getExpiringSubscriptions(days)

		res.json(data)
	}
}

export default new StatsController()
