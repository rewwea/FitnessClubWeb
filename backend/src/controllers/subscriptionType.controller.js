import subscriptionTypeService from '../services/subscriptionType.service.js'

class SubscriptionTypeController {
  async create(req, res) {
    try {
      console.log('[SUBSCRIPTION TYPE CONTROLLER] POST /subscription-types')

      const type = await subscriptionTypeService.createType(req.body)
      res.status(201).json(type)

    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getAll(req, res) {
    try {
      console.log('[SUBSCRIPTION TYPE CONTROLLER] GET /subscription-types')

      const types = await subscriptionTypeService.getAllTypes()
      res.json(types)

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default new SubscriptionTypeController()