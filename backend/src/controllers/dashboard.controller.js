import dashboardService from '../services/dashboard.service.js'

class DashboardController {
  async getDashboard(req, res) {
    try {
      const stats = await dashboardService.getStats()
      res.json(stats)
    } catch (error) {
      res.status(500).json({ message: 'Failed to load dashboard data' })
    }
  }
}

export default new DashboardController()