import express from 'express'
import { registerClient } from '../controllers/client.controller.js'

const router = express.Router();

router.post('/', registerClient);

export default router;