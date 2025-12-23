import express from 'express'
import clientRoutes from './routes/client.routes.js'
import trainerRoutes from './routes/trainer.routes.js'


const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/clients', clientRoutes)
app.use('/api/trainers', trainerRoutes)

export default app