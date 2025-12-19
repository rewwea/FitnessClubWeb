import subscriptionRepository from '../repositories/subscription.repository.js'
import visitRepository from '../repositories/visit.repository.js'
import subscriptionService from './subscription.service.js'

class VisitService {
  async create(clientId) {
    const subscriptions = await subscriptionRepository.findByClient(clientId)

    if (subscriptions.length === 0) {
      throw new Error('Client has no subscriptions')
    }

    const active = await Promise.any(
      subscriptions.map(sub =>
        subscriptionService.checkAccess(sub.id)
          .then(isActive => (isActive ? sub : Promise.reject()))
      )
    ).catch(() => null)

    if (!active) {
      throw new Error('No active subscription')
    }

    return visitRepository.create({ clientId })
  }

  getAll() {
    return visitRepository.findAll()
  }

  getByClient(clientId) {
    return visitRepository.findByClient(clientId)
  }
}

export default new VisitService()