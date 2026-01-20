import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class AdminRepository {
	async create(data) {
		return prisma.admin.create({
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
				role: data.role || 'manager',
				isActive: true,
			},
		})
	}

	async findByEmail(email) {
		return prisma.admin.findUnique({
			where: { email },
		})
	}

	async findById(id) {
		return prisma.admin.findUnique({
			where: { id: parseInt(id) },
		})
	}

	async getAll() {
		return prisma.admin.findMany({
			where: { isActive: true },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				createdAt: true,
			},
		})
	}

	async update(id, data) {
		return prisma.admin.update({
			where: { id: parseInt(id) },
			data,
		})
	}

	async delete(id) {
		return prisma.admin.update({
			where: { id: parseInt(id) },
			data: { isActive: false },
		})
	}
}

export default new AdminRepository()
