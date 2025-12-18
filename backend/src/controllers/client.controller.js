import clientService from '../services/client.service.js'

class ClientController {
  async create(req, res) {
    try {
      const client = await clientService.createClient(req.body)
      res.status(201).json(client)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async getAll(req, res) {
    try {
      const clients = await clientService.getAllClients()
      res.json(clients)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async getById(req, res) {
    try {
      const client = await clientService.getClientById(req.params.id)
      res.json(client)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }

  async update(req, res) {
    try {
      const client = await clientService.updateClient(
        req.params.id,
        req.body
      )
      res.json(client)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async delete(req, res) {
    try {
      await clientService.deleteClient(req.params.id)
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}

export default new ClientController()