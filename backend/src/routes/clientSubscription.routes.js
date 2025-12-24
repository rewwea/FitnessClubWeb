import { Router } from 'express'
import clientSubscriptionController from '../controllers/clientSubscription.controller.js'

const router = Router()

router.post('/', clientSubscriptionController.create)
router.get('/client/:id', clientSubscriptionController.getByClient)

export default router