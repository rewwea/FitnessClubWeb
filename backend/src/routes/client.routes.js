import { Router } from 'express'
import clientController from '../controllers/client.controller.js'

const router = Router()

router.post('/', (req, res) => clientController.create(req, res))
router.get('/', (req, res) => clientController.getAll(req, res))
router.get('/:id', (req, res) => clientController.getById(req, res))
router.put('/:id', (req, res) => clientController.update(req, res))
router.delete('/:id', (req, res) => clientController.delete(req, res))
router.post('/:id/assign-trainer', (req, res) => clientController.assignTrainer(req, res))
router.post('/:id/freeze', (req, res) => clientController.freeze(req, res))
router.post('/:id/unfreeze', (req, res) => clientController.unfreeze(req, res))
router.get('/:id/check-access', (req, res) => clientController.checkAccess(req, res))

export default router