import clientRepository from '../repositories/client.repository.js'
import subscriptionRepository from '../repositories/subscription.repository.js'

const SUBSCRIPTION_TYPES = {
  monthly: 30,
  student: 90,
  evening: 30,
  yearly: 365,
  personal: 10
}

class SubscriptionService {
  async create({ clientId, type, startDate }) {
    if (!SUBSCRIPTION_TYPES[type]) {
      throw new Error('Unknown subscription type')
    }

    const client = await clientRepository.findById(clientId)
    if (!client) {
      throw new Error('Client not found')
    }

    const start = new Date(startDate)
    if (isNaN(start)) {
      throw new Error('Invalid start date')
    }

    const durationDays = SUBSCRIPTION_TYPES[type]
    const end = new Date(start)
    end.setDate(end.getDate() + durationDays)

    return subscriptionRepository.create({
      clientId,
      type,
      startDate: start,
      endDate: end
    })
  }

  async checkAccess(subscriptionId, date = new Date()) {
    const subscription = await subscriptionRepository.findById(subscriptionId)

    if (!subscription || !subscription.isActive) {
      return false
    }

    const checkDate = new Date(date)

    return (
      checkDate >= subscription.startDate &&
      checkDate <= subscription.endDate
    )
  }

  getAll() {
    return subscriptionRepository.findAll()
  }

  getByClient(clientId) {
    return subscriptionRepository.findByClient(clientId)
  }
}

export default new SubscriptionService()