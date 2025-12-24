import clientSubscriptionRepository from '../repositories/clientSubscription.repository.js'
import subscriptionFreezeRepository from '../repositories/subscriptionFreeze.repository.js'

class SubscriptionFreezeService {

  async freezeSubscription(clientSubscriptionId, startDate, endDate) {
    console.log('[FREEZE SERVICE] freezeSubscription:', {
      clientSubscriptionId, startDate, endDate
    })

    if (!clientSubscriptionId || !startDate || !endDate) {
      throw new Error('Все поля обязательны')
    }

    const subscription =
      await clientSubscriptionRepository.findById(clientSubscriptionId)

    if (!subscription || !subscription.isActive) {
      throw new Error('Активная подписка не найдена')
    }

    if (new Date(startDate) >= new Date(endDate)) {
      throw new Error('Дата окончания должна быть позже даты начала')
    }

    const freezeDays =
      Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      )

    // сдвигаем окончание подписки
    await clientSubscriptionRepository.extendEndDate(
      clientSubscriptionId,
      freezeDays
    )

    return subscriptionFreezeRepository.create({
      clientSubscriptionId,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    })
  }
}

export default new SubscriptionFreezeService()