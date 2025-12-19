import subscriptionService from '../services/subscription.service.js'

class SubscriptionController {
  async create(req, res) {
    try {
      const subscription = await subscriptionService.create(req.body)
      res.status(201).json(subscription)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  async getAll(req, res) {
    const subs = await subscriptionService.getAll()
    res.json(subs)
  }

  async getByClient(req, res) {
    const subs = await subscriptionService.getByClient(
      Number(req.params.clientId)
    )
    res.json(subs)
  }

  async checkAccess(req, res) {
    const { id } = req.params
    const { date } = req.query

    const access = await subscriptionService.checkAccess(id, date)
    res.json({ access })
  }
}

export default new SubscriptionController()