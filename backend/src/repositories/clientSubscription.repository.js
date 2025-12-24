import prisma from '../utils/prisma.js'

class ClientSubscriptionRepository {

  async findActiveByClient(clientId) {
    console.log('[CLIENT SUB REPO] findActiveByClient:', clientId)

    return prisma.clientSubscription.findFirst({
      where: {
        clientId,
        isActive: true
      }
    })
  }

  async create(data) {
    console.log('[CLIENT SUB REPO] create:', data)

    return prisma.clientSubscription.create({
      data
    })
  }

  async findByClient(clientId) {
    console.log('[CLIENT SUB REPO] findByClient:', clientId)

    return prisma.clientSubscription.findMany({
      where: { clientId },
      include: { type: true },
      orderBy: { startDate: 'desc' }
    })
  }

  async findById(id) {
    console.log('[CLIENT SUB REPO] findById:', id)

    return prisma.clientSubscription.findUnique({
      where: { id }
    })
  }

  async extendEndDate(id, days) {
    console.log('[CLIENT SUB REPO] extendEndDate:', { id, days })

    const subscription = await this.findById(id)

    const newEndDate = new Date(subscription.endDate)
    newEndDate.setDate(newEndDate.getDate() + days)

    return prisma.clientSubscription.update({
      where: { id },
      data: {
        endDate: newEndDate
      }
    })
  }
}

export default new ClientSubscriptionRepository()