import express from 'express'
import db from './database/database.js'
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors'

const app = express()

const PORT = 5000

app.use(cors())
app.use(express.json())
app.use('/api/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.json({
    message: 'DevOps TaskHub API is running'
  })
})

app.get('/api/health', (req, res) => {
  const result = db.prepare('SELECT 1 AS database_status').get()

  res.json({
    status: 'healthy',
    database: result.database_status === 1 ? 'connected' : 'error'
  })
})

app.use('/api/tasks', taskRoutes)

app.listen(PORT, () => {
  console.log("Server running on http:" + PORT);
})