import { Router } from 'express'
import statsController from '../controllers/stats.controller.js'

const router = Router()

router.get('/summary', statsController.summary)
router.get('/visits-by-days', statsController.visitsByDays)
router.get('/top-clients', statsController.topClients)
router.get(
	'/clients-without-subscription',
	statsController.clientsWithoutSubscription
)
router.get('/subscriptions-expiring', statsController.expiringSubscriptions)

export default router
