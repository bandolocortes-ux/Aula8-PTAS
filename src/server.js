import express from 'express'
import cors from 'cors'
import { connectDatabase } from './mongodb.js'
import productsRouter from './routes/products.routes.js'
import usersRouter from './routes/users.routes.js'

const app = express()

const allowedOrigins = process.env.CORS_ORIGIN
  ?.split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins?.length ? allowedOrigins : true }))
app.use(express.json())
app.use('/products', productsRouter)
app.use('/users', usersRouter)

app.use((error, req, res, next) => {
  const status = error.status ?? 500
  res.status(status).json({ erro: error.message })
})

const port = process.env.PORT ?? 3000

async function startServer() {
  await connectDatabase()
  app.listen(port, () => console.log(`API disponível na porta ${port}`))
}

startServer().catch(error => {
  console.error('Falha ao iniciar a API:', error.message)
  process.exitCode = 1
})