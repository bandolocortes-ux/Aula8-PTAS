import { usersModel } from '../models/users.model.js'

export async function authenticate(email, password) {
  const matchingUser = (await usersModel.findAll())
    .find(user => user.email === email)

  if (!matchingUser) {
    const error = new Error('credenciais inválidas')
    error.status = 401
    throw error
  }

  const user = await usersModel.findById(matchingUser.id)
  if (!user || user.senha !== password) {
    const error = new Error('credenciais inválidas')
    error.status = 401
    throw error
  }

  const { senha, ...authenticatedUser } = user
  return authenticatedUser
}