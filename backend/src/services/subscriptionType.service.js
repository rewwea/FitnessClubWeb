import subscriptionTypeRepository from '../repositories/subscriptionType.repository.js'

class SubscriptionTypeService {
  async createType(data) {
    console.log('[SUBSCRIPTION TYPE SERVICE] createType input:', data)

    const { name, durationDays, price } = data

    if (!name || !durationDays || !price) {
      throw new Error('name, durationDays и price обязательны')
    }

    if (durationDays <= 0) {
      throw new Error('durationDays должен быть больше 0')
    }

    if (price <= 0) {
      throw new Error('price должен быть больше 0')
    }

    return subscriptionTypeRepository.create({
      name,
      durationDays,
      price
    })
  }

  async getAllTypes() {
    console.log('[SUBSCRIPTION TYPE SERVICE] getAllTypes')

    return subscriptionTypeRepository.findAll()
  }
}

export default new SubscriptionTypeService()