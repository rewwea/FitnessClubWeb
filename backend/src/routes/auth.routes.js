import express from 'express'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', authController.register.bind(authController))
router.post('/login', authController.login.bind(authController))
router.get('/profile', authController.getProfile.bind(authController))
router.get('/admins', authController.getAllAdmins.bind(authController))

export default router
