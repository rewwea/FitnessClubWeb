import { Router } from 'express'
import clientController from '../controllers/client.controller.js'

const router = Router();

router.post('/', clientController.create);
router.get('/', clientController.getAll);
router.get('/:id', clientController.getById);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.remove);

export default router;