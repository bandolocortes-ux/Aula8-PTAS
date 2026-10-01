import express from 'express'
import productsRouter from './routes/products.routes.js'
import usersRouter from './routes/users.routes.js'

const app = express()

app.use(express.json())
app.use('/products', productsRouter)
app.use('/users', usersRouter)

app.use((error, req, res, next) => {
  const status = error.status ?? 500
  res.status(status).json({ erro: error.message })
})

const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`API disponível na porta ${port}`))