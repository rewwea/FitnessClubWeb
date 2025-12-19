import prisma from '../utils/prisma.js'

class LookupService {
  async getLookups() {
    const trainers = await prisma.trainer.findMany({
      select: { id: true, name: true }
    })

    const subscriptionTypes = [
      { code: 'MONTH', label: 'Monthly' },
      { code: 'STUDENT', label: 'Student' },
      { code: 'EVENING', label: 'Evening' }
    ]

    const clientStatuses = ['ACTIVE', 'FROZEN', 'EXPIRED']

    return {
      trainers,
      subscriptionTypes,
      clientStatuses
    }
  }
}

export default new LookupService()