import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
	const password = crypto
		.createHash('sha256')
		.update('password123')
		.digest('hex')

	const admin = await prisma.admin.upsert({
		where: { email: 'admin@example.com' },
		update: {},
		create: {
			firstName: 'Иван',
			lastName: 'Администратор',
			email: 'admin@example.com',
			password,
			role: 'admin',
			isActive: true,
		},
	})

	console.log('Admin created:', admin)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
