import visitService from '../services/visit.service.js'

class VisitController {

  async create(req, res) {
    try {
      console.log('[VISIT CONTROLLER] POST /visits')

      const { clientId } = req.body
      const visit = await visitService.createVisit(clientId)

      res.status(201).json(visit)

    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getByClient(req, res) {
    try {
      console.log('[VISIT CONTROLLER] GET /clients/:id/visits')

      const clientId = Number(req.params.id)
      const visits = await visitService.getClientVisits(clientId)

      res.json(visits)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getCount(req, res) {
    try {
      console.log('[VISIT CONTROLLER] GET /clients/:id/visits/count')

      const clientId = Number(req.params.id)
      const count = await visitService.getClientVisitCount(clientId)

      res.json({ count })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default new VisitController()