import express from 'express'
import clientRoutes from './routes/client.routes.js'
import clubManagerRoutes from './routes/clubManager.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import lookupRoutes from './routes/lookup.routes.js'
import subscriptionRoutes from './routes/subscription.routes.js'
import trainerRoutes from './routes/trainer.routes.js'
import visitRoutes from './routes/visit.routes.js'

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/clients', clientRoutes)
app.use('/api/trainers', trainerRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/visits', visitRoutes)
app.use('/api/club', clubManagerRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/lookups', lookupRoutes)

export default app