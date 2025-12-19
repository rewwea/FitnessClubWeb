import prisma from '../utils/prisma.js'

class DashboardService {
  async getStats() {
    const totalClients = await prisma.client.count()

    const activeSubscriptions = await prisma.subscription.count({
      where: {
        endDate: { gte: new Date() }
      }
    })

    const clientsWithoutTrainer = await prisma.client.count({
      where: {
        trainerId: null
      }
    })

    const totalTrainers = await prisma.trainer.count()

    return {
      totalClients,
      activeSubscriptions,
      clientsWithoutTrainer,
      totalTrainers
    }
  }
}

export default new DashboardService()