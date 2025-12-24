import clientRepository from '../repositories/client.repository.js'
import clientSubscriptionRepository from '../repositories/clientSubscription.repository.js'
import subscriptionTypeRepository from '../repositories/subscriptionType.repository.js'

class ClientSubscriptionService {
	async createSubscription({ clientId, typeId }) {
		console.log('[CLIENT SUB SERVICE] createSubscription:', {
			clientId,
			typeId,
		})

		if (!clientId || !typeId) {
			throw new Error('clientId и typeId обязательны')
		}

		const client = await clientRepository.findById(clientId)
		if (!client) {
			throw new Error('Клиент не найден')
		}

		const type = await subscriptionTypeRepository.findById(typeId)
		if (!type || !type.isActive) {
			throw new Error('Тип подписки не найден или неактивен')
		}

		const activeSub = await clientSubscriptionRepository.findActiveByClient(
			clientId
		)
		if (activeSub) {
			throw new Error('У клиента уже есть активная подписка')
		}

		const startDate = new Date()
		const endDate = new Date(startDate)
		endDate.setDate(endDate.getDate() + type.durationDays)

		return clientSubscriptionRepository.create({
			clientId,
			typeId,
			startDate,
			endDate,
			price: type.price,
		})
	}

	async getClientSubscriptions(clientId) {
		console.log('[CLIENT SUB SERVICE] getClientSubscriptions:', clientId)

		return clientSubscriptionRepository.findByClient(clientId)
	}

	async expireSubscriptions() {
		console.log('[CLIENT SUB SERVICE] expireSubscriptions started')

		const expiredSubs = await clientSubscriptionRepository.findExpiredActive()

		for (const sub of expiredSubs) {
			console.log('[CLIENT SUB SERVICE] expiring subscription:', sub.id)
			await clientSubscriptionRepository.deactivate(sub.id)
		}

		console.log(
			'[CLIENT SUB SERVICE] expireSubscriptions finished:',
			expiredSubs.length
		)
	}
}

export default new ClientSubscriptionService()
