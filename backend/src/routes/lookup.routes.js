import { Router } from 'express'
import lookupController from '../controllers/lookup.controller.js'

const router = Router()

router.get('/', (req, res) => lookupController.getLookups(req, res))

export default router