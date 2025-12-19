import lookupService from '../services/lookup.service.js'

class LookupController {
  async getLookups(req, res) {
    try {
      const data = await lookupService.getLookups()
      res.json(data)
    } catch (error) {
      res.status(500).json({ message: 'Failed to load lookups' })
    }
  }
}

export default new LookupController()