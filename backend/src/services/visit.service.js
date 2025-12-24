import clientRepository from '../repositories/client.repository.js'
import clientSubscriptionRepository from '../repositories/clientSubscription.repository.js'
import subscriptionFreezeRepository from '../repositories/subscriptionFreeze.repository.js'
import visitRepository from '../repositories/visit.repository.js'

class VisitService {
	async createVisit(clientId) {
		console.log('[VISIT SERVICE] createVisit:', clientId)

		if (!clientId) {
			throw new Error('clientId обязателен')
		}

		const activeFreeze = await subscriptionFreezeRepository.findActiveFreeze(
			activeSubscription.id
		)
		if (activeFreeze) {
			throw new Error('Подписка заморожена')
		}

		const client = await clientRepository.findById(clientId)
		if (!client || !client.isActive) {
			throw new Error('Клиент не найден или неактивен')
		}

		const activeSubscription =
			await clientSubscriptionRepository.findActiveByClient(clientId)

		if (!activeSubscription) {
			throw new Error('У клиента нет активной подписки')
		}

		const now = new Date()
		if (activeSubscription.endDate < now) {
			throw new Error('Подписка клиента истекла')
		}

		return visitRepository.create(clientId)
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
