import { Router } from 'express'
import subscriptionTypeController from '../controllers/subscriptionType.controller.js'

const router = Router()

router.post('/', subscriptionTypeController.create)
router.get('/', subscriptionTypeController.getAll)

export default router