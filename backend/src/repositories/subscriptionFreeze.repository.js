import prisma from '../utils/prisma.js'

class SubscriptionFreezeRepository {

  async create(data) {
    console.log('[FREEZE REPOSITORY] create:', data)

    return prisma.subscriptionFreeze.create({ data })
  }

  async findActiveFreeze(clientSubscriptionId) {
    console.log('[FREEZE REPOSITORY] findActiveFreeze:', clientSubscriptionId)

    const now = new Date()

    return prisma.subscriptionFreeze.findFirst({
      where: {
        clientSubscriptionId,
        startDate: { lte: now },
        endDate: { gte: now }
      }
    })
  }
}

export default new SubscriptionFreezeRepository()