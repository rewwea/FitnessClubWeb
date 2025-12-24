import prisma from '../utils/prisma.js'

class SubscriptionTypeRepository {
  async create(data) {
    console.log('[SUBSCRIPTION TYPE REPO] create:', data)

    return prisma.subscriptionType.create({
      data
    })
  }

  async findAll() {
    console.log('[SUBSCRIPTION TYPE REPO] findAll')

    return prisma.subscriptionType.findMany({
      where: { isActive: true },
      orderBy: { id: 'asc' }
    })
  }

  async findById(id) {
    console.log('[SUBSCRIPTION TYPE REPO] findById:', id)

    return prisma.subscriptionType.findUnique({
      where: { id }
    })
  }

  async deactivate(id) {
    console.log('[SUBSCRIPTION TYPE REPO] deactivate:', id)

    return prisma.subscriptionType.update({
      where: { id },
      data: { isActive: false }
    })
  }
}

export default new SubscriptionTypeRepository()