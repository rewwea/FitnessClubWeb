import { Router } from 'express'
import visitController from '../controllers/visit.controller.js'

const router = Router()

router.post('/', visitController.create)
router.get('/client/:id', visitController.getByClient)
router.get('/client/:id/count', visitController.getCount)

export default router