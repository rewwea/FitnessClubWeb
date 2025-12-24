import { Router } from 'express'
import controller from '../controllers/subscriptionFreeze.controller.js'

const router = Router()

router.post('/', controller.freeze)

export default router