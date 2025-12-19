import { Router } from 'express'
import subscriptionController from '../controllers/subscription.controller.js'

const router = Router()

router.post('/', (req, res) => subscriptionController.create(req, res))
router.get('/', (req, res) => subscriptionController.getAll(req, res))
router.get('/client/:clientId', (req, res) =>
  subscriptionController.getByClient(req, res)
)
router.get('/:id/access', (req, res) =>
  subscriptionController.checkAccess(req, res)
)

export default router