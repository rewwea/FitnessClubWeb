import trainerService from '../services/trainer.service.js'

class TrainerController {
  async create(req, res) {
    console.log('[TRAINER CONTROLLER] POST /trainers')
    try {
      const trainer = await trainerService.createTrainer(req.body)
      res.status(201).json(trainer)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getAll(req, res) {
    console.log('[TRAINER CONTROLLER] GET /trainers')
    const trainers = await trainerService.getAllTrainers()
    res.json(trainers)
  }

  async getById(req, res) {
    console.log('[TRAINER CONTROLLER] GET /trainers/:id')
    try {
      const trainer = await trainerService.getTrainerById(req.params.id)
      res.json(trainer)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  }

  async update(req, res) {
    console.log('[TRAINER CONTROLLER] PUT /trainers/:id')
    try {
      const trainer = await trainerService.updateTrainer(
        req.params.id,
        req.body
      )
      res.json(trainer)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete(req, res) {
    console.log('[TRAINER CONTROLLER] DELETE /trainers/:id')
    try {
      await trainerService.deleteTrainer(req.params.id)
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

export default new TrainerController()