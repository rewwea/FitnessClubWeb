export class SubscriptionService {

  static hasActiveSubscription(subscriptions) {
    const today = new Date();
    return subscriptions.some(s => today <= s.endDate);
  }

  static calculateEndDate(startDate, days) {
    const end = new Date(startDate);
    end.setDate(end.getDate() + days);
    return end;
  }

}