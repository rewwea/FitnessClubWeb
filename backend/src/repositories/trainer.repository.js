import prisma from '../utils/prisma.js'

class TrainerRepository {
  async create(data) {
    console.log('[TRAINER REPOSITORY] create:', data)
    return prisma.trainer.create({ data })
  }

  async findAll() {
    console.log('[TRAINER REPOSITORY] findAll')
    return prisma.trainer.findMany()
  }

  async findById(id) {
    console.log('[TRAINER REPOSITORY] findById:', id)
    return prisma.trainer.findUnique({
      where: { id: Number(id) }
    })
  }

  async update(id, data) {
    console.log('[TRAINER REPOSITORY] update:', id, data)
    return prisma.trainer.update({
      where: { id: Number(id) },
      data
    })
  }

  async remove(id) {
    console.log('[TRAINER REPOSITORY] remove:', id)
    return prisma.trainer.delete({
      where: { id: Number(id) }
    })
  }
}

export default new TrainerRepository()