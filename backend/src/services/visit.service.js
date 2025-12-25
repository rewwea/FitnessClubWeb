import clientRepository from '../repositories/client.repository.js'
import clientSubscriptionRepository from '../repositories/clientSubscription.repository.js'
import subscriptionFreezeRepository from '../repositories/subscriptionFreeze.repository.js'
import visitRepository from '../repositories/visit.repository.js'

class VisitService {
	async createVisit(clientId, trainerId = null) {
		console.log('[VISIT SERVICE] createVisit:', { clientId, trainerId })

		if (!clientId) {
			throw new Error('clientId обязателен')
		}

		const client = await clientRepository.findById(Number(clientId))
		if (!client || !client.isActive) {
			throw new Error('Клиент не найден или неактивен')
		}

		const activeSubscription =
			await clientSubscriptionRepository.findActiveByClient(Number(clientId))

		if (!activeSubscription) {
			throw new Error('У клиента нет активной подписки')
		}

		const now = new Date()
		if (activeSubscription.endDate < now) {
			throw new Error('Подписка клиента истекла')
		}

		const activeFreeze = await subscriptionFreezeRepository.findActiveFreeze(
			activeSubscription.id
		)
		if (activeFreeze) {
			throw new Error('Подписка заморожена')
		}

		return visitRepository.create(
			Number(clientId),
			trainerId ? Number(trainerId) : null
		)
	}

	async getClientVisits(clientId) {
		console.log('[VISIT SERVICE] getClientVisits:', clientId)

		return visitRepository.findByClient(clientId)
	}

	async getClientVisitCount(clientId) {
		console.log('[VISIT SERVICE] getClientVisitCount:', clientId)

		return visitRepository.countByClient(clientId)
	}
}

export default new VisitService()
