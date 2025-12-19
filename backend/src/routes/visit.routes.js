import { Router } from 'express'
import visitController from '../controllers/visit.controller.js'

const router = Router()

router.post('/', (req, res) => visitController.create(req, res))
router.get('/', (req, res) => visitController.getAll(req, res))
router.get('/client/:clientId', (req, res) =>
  visitController.getByClient(req, res)
)

export default router