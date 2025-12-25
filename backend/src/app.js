import cors from 'cors'
import express from 'express'
import clientRoutes from './routes/client.routes.js'
import clientSubscriptionRoutes from './routes/clientSubscription.routes.js'
import statsRoutes from './routes/stats.routes.js'
import subscriptionFreezeRoutes from './routes/subscriptionFreeze.routes.js'
import subscriptionTypeRoutes from './routes/subscriptionType.routes.js'
import trainerRoutes from './routes/trainer.routes.js'
import visitRoutes from './routes/visit.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/health', (req, res) => {
	res.json({ status: 'ok' })
})

app.use('/api/clients', clientRoutes)
app.use('/api/trainers', trainerRoutes)
app.use('/api/subscription-types', subscriptionTypeRoutes)
app.use('/api/client-subscriptions', clientSubscriptionRoutes)
app.use('/api/visits', visitRoutes)
app.use('/api/subscription-freeze', subscriptionFreezeRoutes)
app.use('/api/stats', statsRoutes)

export default app
