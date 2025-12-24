import clientSubscriptionService from '../services/clientSubscription.service.js'

class ClientSubscriptionController {

  async create(req, res) {
    try {
      console.log('[CLIENT SUB CONTROLLER] POST /client-subscriptions')

      const subscription = await clientSubscriptionService.createSubscription(req.body)
      res.status(201).json(subscription)

    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getByClient(req, res) {
    try {
      console.log('[CLIENT SUB CONTROLLER] GET /clients/:id/subscriptions')

      const clientId = Number(req.params.id)
      const subs = await clientSubscriptionService.getClientSubscriptions(clientId)

      res.json(subs)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default new ClientSubscriptionController()