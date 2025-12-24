import app from './app.js'
import clientSubscriptionService from './services/clientSubscription.service.js'

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})

// каждые 60 секунд проверяем и деактивируем истекшие подписки
setInterval(async () => {
	try {
		console.log('[CRON] checking expired subscriptions...')
		await clientSubscriptionService.expireSubscriptions()
	} catch (err) {
		console.error('[CRON ERROR]', err.message)
	}
}, 60 * 1000)
