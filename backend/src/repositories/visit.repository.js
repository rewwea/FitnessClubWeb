import prisma from '../utils/prisma.js'

class VisitRepository {
  create(data) {
    return prisma.visit.create({ data })
  }

  findAll() {
    return prisma.visit.findMany({
      include: { client: true }
    })
  }

  findByClient(clientId) {
    return prisma.visit.findMany({
      where: { clientId }
    })
  }
}

export default new VisitRepository()