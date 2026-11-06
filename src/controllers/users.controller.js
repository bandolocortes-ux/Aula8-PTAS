import { usersService } from '../services/users.service.js'

export async function listUsers(req, res, next) {
  try {
    res.json(await usersService.listUsers())
  } catch (error) {
    next(error)
  }
}

export async function getUser(req, res, next) {
  try {
    res.json(await usersService.getUser(req.params.id))
  } catch (error) {
    next(error)
  }
}

export async function createUser(req, res, next) {
  try {
    res.status(201).json(await usersService.createUser(req.body))
  } catch (error) {
    next(error)
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await usersService.updateUser(req.params.id, req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export async function deleteUser(req, res, next) {
  try {
    res.json(await usersService.deleteUser(req.params.id))
  } catch (error) {
    next(error)
  }
}