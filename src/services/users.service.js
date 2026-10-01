import { usersModel } from '../models/users.model.js'

export const usersService = {
  async createUser(data) {
    const emailAlreadyExists = (await usersModel.findAll())
      .some(user => user.email === data.email)

    if (emailAlreadyExists) {
      const error = new Error('e-mail já cadastrado')
      error.status = 409
      throw error
    }

    return usersModel.create(data)
  },

  async updateUser(id, data) {
    const user = await usersModel.findById(id)
    if (!user) {
      const error = new Error('usuário não encontrado')
      error.status = 404
      throw error
    }

    return usersModel.update(id, data)
  },
}