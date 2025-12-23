import trainerRepository from '../repositories/trainer.repository.js'

class TrainerService {
  async createTrainer(data) {
    console.log('[TRAINER SERVICE] createTrainer input:', data)

    const { firstName, lastName, email, specialty } = data

    if (!firstName || !lastName || !email || !specialty) {
      throw new Error('firstName, lastName, email и specialty обязательны')
    }

    const trainer = await trainerRepository.create(data)
    console.log('[TRAINER SERVICE] created:', trainer)

    return trainer
  }

  async getAllTrainers() {
    console.log('[TRAINER SERVICE] getAllTrainers')
    return trainerRepository.findAll()
  }

  async getTrainerById(id) {
    console.log('[TRAINER SERVICE] getTrainerById:', id)

    const trainer = await trainerRepository.findById(id)
    if (!trainer) {
      throw new Error('Тренер не найден')
    }

    return trainer
  }

  async updateTrainer(id, data) {
    console.log('[TRAINER SERVICE] updateTrainer:', id, data)

    if (!data || Object.keys(data).length === 0) {
      throw new Error('Нет данных для обновления')
    }

    return trainerRepository.update(id, data)
  }

  async deleteTrainer(id) {
    console.log('[TRAINER SERVICE] deleteTrainer:', id)
    return trainerRepository.remove(id)
  }
}

export default new TrainerService()