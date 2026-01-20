import adminService from '../services/admin.service.js'

class AuthController {
	async register(req, res) {
		console.log('[AUTH CONTROLLER] POST /auth/register')

		try {
			const { firstName, lastName, email, password } = req.body

			if (!firstName || !lastName || !email || !password) {
				return res.status(400).json({
					error: 'Требуются все поля: firstName, lastName, email, password',
				})
			}

			const admin = await adminService.register({
				firstName,
				lastName,
				email,
				password,
			})

			res.status(201).json({
				message: 'Администратор зарегистрирован',
				admin,
			})
		} catch (error) {
			console.error('[AUTH CONTROLLER] register error:', error.message)
			res.status(400).json({ error: error.message })
		}
	}

	async login(req, res) {
		console.log('[AUTH CONTROLLER] POST /auth/login')

		try {
			const { email, password } = req.body

			if (!email || !password) {
				return res.status(400).json({
					error: 'Требуются email и пароль',
				})
			}

			const admin = await adminService.login(email, password)

			// В реальном приложении здесь был бы JWT токен
			// Для упрощения возвращаем объект с данными админа
			const token = Buffer.from(`${admin.id}:${email}`).toString('base64')

			res.json({
				message: 'Успешно авторизованы',
				admin,
				token,
			})
		} catch (error) {
			console.error('[AUTH CONTROLLER] login error:', error.message)
			res.status(401).json({ error: error.message })
		}
	}

	async getProfile(req, res) {
		console.log('[AUTH CONTROLLER] GET /auth/profile')

		try {
			const adminId = req.headers['x-admin-id']

			if (!adminId) {
				return res.status(401).json({ error: 'Требуется авторизация' })
			}

			const admin = await adminService.getAdmin(adminId)
			res.json(admin)
		} catch (error) {
			console.error('[AUTH CONTROLLER] getProfile error:', error.message)
			res.status(400).json({ error: error.message })
		}
	}

	async getAllAdmins(req, res) {
		console.log('[AUTH CONTROLLER] GET /auth/admins')

		try {
			const admins = await adminService.getAllAdmins()
			res.json(admins)
		} catch (error) {
			console.error('[AUTH CONTROLLER] getAllAdmins error:', error.message)
			res.status(500).json({ error: error.message })
		}
	}
}

export default new AuthController()
