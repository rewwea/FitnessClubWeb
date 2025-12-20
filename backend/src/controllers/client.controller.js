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
  async assignTrainer(req, res) {
    try {
      const { id } = req.params
      const { trainerId } = req.body

      if (!trainerId) {
        return res.status(400).json({ message: 'trainerId is required' })
      }

      const client = await clientService.assignTrainer(
        Number(id),
        Number(trainerId)
      )

      res.json(client)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
  async freeze(req, res) {
  try {
    const { id } = req.params
    const client = await clientService.freezeClient(Number(id))
    res.json(client)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
async unfreeze(req, res) {
  try {
    const { id } = req.params
    const client = await clientService.unfreezeClient(Number(id))
    res.json(client)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
async checkAccess(req, res) {
  try {
    const { id } = req.params
    const access = await clientService.checkAccess(Number(id))
    res.json({ access })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
}

export default new ClientController()