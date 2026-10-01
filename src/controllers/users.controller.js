import { usersService } from '../services/users.service.js'

export async function createUser(req, res, next) {
  try {
    res.status(201).json(await usersService.createUser(req.body))
  } catch (error) {
    next(error)
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await usersService.updateUser(Number(req.params.id), req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
}