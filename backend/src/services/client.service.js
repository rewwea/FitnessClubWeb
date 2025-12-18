import clientRepository from '../repositories/client.repository.js'

class ClientService {
  async createClient(data) {
    const { fullName, email, phone } = data

    // валидация данных
    if (!fullName || fullName.length < 3) {
      throw new Error('Full name must be at least 3 characters')
    }

    if (!email || !email.includes('@')) {
      throw new Error('Invalid email')
    }

    if (!phone || phone.length < 10) {
      throw new Error('Invalid phone number')
    }

    // проверка на существование клиента с таким email
    const existingClient = await clientRepository.findByEmail(email)
    if (existingClient) {
      throw new Error('Client with this email already exists')
    }

    return clientRepository.create({
      fullName,
      email,
      phone,
    })
  }

  async getAllClients() {
    return clientRepository.findAll()
  }

  async getClientById(id) {
    if (!id || isNaN(id)) {
      throw new Error('Invalid client id')
    }

    const client = await clientRepository.findById(Number(id))
    if (!client) {
      throw new Error('Client not found')
    }

    return client
  }

  async updateClient(id, data) {
    if (!id || isNaN(id)) {
      throw new Error('Invalid client id')
    }

    return clientRepository.update(Number(id), data)
  }

  async deleteClient(id) {
    if (!id || isNaN(id)) {
      throw new Error('Invalid client id')
    }

    return clientRepository.delete(Number(id))
  }
}

export default new ClientService()