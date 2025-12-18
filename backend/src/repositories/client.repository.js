import prisma from '../utils/prisma.js'

class ClientRepository {
  async create(data) {
    return prisma.client.create({
      data,
    })
  }

  async findAll() {
    return prisma.client.findMany()
  }

  async findById(id) {
    return prisma.client.findUnique({
      where: { id },
    })
  }

  async findByEmail(email) {
    return prisma.client.findUnique({
      where: { email },
    })
  }

  async update(id, data) {
    return prisma.client.update({
      where: { id },
      data,
    })
  }

  async delete(id) {
    return prisma.client.delete({
      where: { id },
    })
  }
}

export default new ClientRepository()