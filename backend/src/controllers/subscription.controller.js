import * as clientRepo from '../repositories/client.repository.js'
import * as subRepo from '../repositories/subscription.repository.js'
import * as planRepo from '../repositories/subscriptionPlan.repository.js'
import { SubscriptionService } from '../services/subscription.service.js'

export const buySubscription = async (req, res) => {
  const { clientId, planId } = req.body;

  const client = await clientRepo.findClientById(clientId);
  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  if (SubscriptionService.hasActiveSubscription(client.subscriptions)) {
    return res.status(400).json({ error: 'Active subscription already exists' });
  }

  const plan = await planRepo.getPlanById(planId);
  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }

  const startDate = new Date();
  const endDate = SubscriptionService.calculateEndDate(startDate, plan.days);

  const subscription = await subRepo.createSubscription({
    clientId,
    planId,
    startDate,
    endDate
  });

  res.json({ message: 'Subscription created', subscription });
};