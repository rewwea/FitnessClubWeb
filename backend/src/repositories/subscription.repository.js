import prisma from '../utils/prisma.js'

class SubscriptionRepository {
  create(data) {
    return prisma.subscription.create({ data })
  }

  findById(id) {
    return prisma.subscription.findUnique({
      where: { id },
      include: { client: true }
    })
  }

  findByClient(clientId) {
    return prisma.subscription.findMany({
      where: { clientId }
    })
  }

  findAll() {
    return prisma.subscription.findMany({
      include: { client: true }
    })
  }
}

export default new SubscriptionRepository()