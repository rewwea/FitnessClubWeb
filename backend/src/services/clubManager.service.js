import clientRepository from '../repositories/client.repository.js'
import trainerRepository from '../repositories/trainer.repository.js'

class ClubManager {
  async assignTrainer(clientId, trainerId) {
    const client = await clientRepository.findById(clientId)
    if (!client) {
      throw new Error('Client not found')
    }

    const trainer = await trainerRepository.findById(trainerId)
    if (!trainer) {
      throw new Error('Trainer not found')
    }

    return clientRepository.update(clientId, {
      trainerId
    })
  }
}

export default new ClubManager()