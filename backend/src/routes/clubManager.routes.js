import { Router } from 'express'
import clubManagerController from '../controllers/clubManager.controller.js'

const router = Router()

router.post('/assign-trainer', (req, res) =>
  clubManagerController.assignTrainer(req, res)
)

export default router