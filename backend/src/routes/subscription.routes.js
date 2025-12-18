import express from 'express'
import { buySubscription } from '../controllers/subscription.controller.js'

const router = express.Router();

router.post('/buy', buySubscription);

export default router;