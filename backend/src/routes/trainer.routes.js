import { Router } from 'express'
import trainerController from '../controllers/trainer.controller.js'

const router = Router()

router.post('/', trainerController.create)
router.get('/', trainerController.getAll)
router.get('/:id', trainerController.getById)
router.put('/:id', trainerController.update)
router.delete('/:id', trainerController.delete)

export default router