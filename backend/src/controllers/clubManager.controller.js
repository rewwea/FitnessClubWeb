import clubManager from '../services/clubManager.service.js'

class ClubManagerController {
  async assignTrainer(req, res) {
    try {
      const { clientId, trainerId } = req.body
      const result = await clubManager.assignTrainer(clientId, trainerId)
      res.json(result)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }
}

export default new ClubManagerController()