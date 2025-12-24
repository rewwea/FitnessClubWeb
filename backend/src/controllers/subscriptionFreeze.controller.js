import subscriptionFreezeService from '../services/subscriptionFreeze.service.js'

class SubscriptionFreezeController {

  async freeze(req, res) {
    try {
      console.log('[FREEZE CONTROLLER] POST /freeze')

      const { clientSubscriptionId, startDate, endDate } = req.body

      const freeze =
        await subscriptionFreezeService.freezeSubscription(
          clientSubscriptionId,
          startDate,
          endDate
        )

      res.status(201).json(freeze)

    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

export default new SubscriptionFreezeController()