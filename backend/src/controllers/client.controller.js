import * as clientRepo from '../repositories/client.repository.js'
import * as trainerRepo from '../repositories/trainer.repository.js'
import { ClubService } from '../services/club.service.js'
import { ValidationService } from '../services/validation.service.js'

export const registerClient = async (req, res) => {
  const { name, phone, age, isStudent } = req.body;

  // базовая валидация
  if (!name || !phone || age === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!ValidationService.validatePhone(phone)) {
    return res.status(400).json({ error: 'Invalid phone format' });
  }

  if (!ValidationService.validateAge(age)) {
    return res.status(400).json({ error: 'Invalid age' });
  }

  const existing = await clientRepo.findClientByPhone(phone);
  if (existing) {
    return res.status(400).json({ error: 'Phone already exists' });
  }

  const client = await clientRepo.createClient({
    name,
    phone,
    age,
    isStudent: Boolean(isStudent)
  });

  const trainers = await trainerRepo.getActiveTrainers();
  const trainer = ClubService.findAvailableTrainer(trainers);

  if (trainer) {
    await trainerRepo.assignTrainer(client.id, trainer.id);
  }

  res.json({ message: 'Client registered', client });
};