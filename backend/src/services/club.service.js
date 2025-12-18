export class ClubService {

  static findAvailableTrainer(trainers, maxClients = 10) {
    return trainers.find(t => t.clients.length < maxClients);
  }

}