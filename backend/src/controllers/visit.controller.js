import visitService from '../services/visit.service.js'

class VisitController {
  async create(req, res) {
    try {
      const visit = await visitService.create(Number(req.body.clientId))
      res.status(201).json(visit)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  async getAll(req, res) {
    const visits = await visitService.getAll()
    res.json(visits)
  }

  async getByClient(req, res) {
    const visits = await visitService.getByClient(
      Number(req.params.clientId)
    )
    res.json(visits)
  }
}

export default new VisitController()