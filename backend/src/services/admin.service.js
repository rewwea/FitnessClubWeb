import crypto from 'crypto'
import adminRepository from '../repositories/admin.repository.js'

class AdminService {
	hashPassword(password) {
		return crypto.createHash('sha256').update(password).digest('hex')
	}

	verifyPassword(password, hash) {
		return this.hashPassword(password) === hash
	}

	async register(data) {
		// Проверяем есть ли админ с таким email
		const existingAdmin = await adminRepository.findByEmail(data.email)
		if (existingAdmin) {
			throw new Error('Администратор с таким email уже существует')
		}

		const hashedPassword = this.hashPassword(data.password)

		const admin = await adminRepository.create({
			...data,
			password: hashedPassword,
		})

		return {
			id: admin.id,
			firstName: admin.firstName,
			lastName: admin.lastName,
			email: admin.email,
			role: admin.role,
		}
	}

	async login(email, password) {
		const admin = await adminRepository.findByEmail(email)

		if (!admin) {
			throw new Error('Администратор не найден')
		}

		if (!admin.isActive) {
			throw new Error('Учетная запись неактивна')
		}

		const isPasswordValid = this.verifyPassword(password, admin.password)
		if (!isPasswordValid) {
			throw new Error('Неверный пароль')
		}

		return {
			id: admin.id,
			firstName: admin.firstName,
			lastName: admin.lastName,
			email: admin.email,
			role: admin.role,
		}
	}

	async getAdmin(id) {
		const admin = await adminRepository.findById(id)

		if (!admin) {
			throw new Error('Администратор не найден')
		}

		return {
			id: admin.id,
			firstName: admin.firstName,
			lastName: admin.lastName,
			email: admin.email,
			role: admin.role,
		}
	}

	async getAllAdmins() {
		return adminRepository.getAll()
	}
}

export default new AdminService()
