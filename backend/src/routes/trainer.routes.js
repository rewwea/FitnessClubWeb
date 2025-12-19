import express from 'express'
import trainerController from '../controllers/trainer.controller.js'

const router = express.Router();

router.post('/', trainerController.createTrainer);
router.get('/', trainerController.getAllTrainers);

export default router;