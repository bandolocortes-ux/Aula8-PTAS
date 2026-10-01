import { readUsers, writeUsers } from '../db.js'

export const usersModel = {
  async findAll() {
    return readUsers()
  },

  async findById(id) {
    return (await readUsers()).find(user => user.id === id) ?? null
  },

  async create(data) {
    const users = await readUsers()
    const id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1
    const user = { id, ...data }
    users.push(user)
    await writeUsers(users)
    return user
  },

  async update(id, data) {
    const users = await readUsers()
    const index = users.findIndex(user => user.id === id)
    if (index === -1) return null

    users[index] = { ...users[index], ...data, id }
    await writeUsers(users)
    return users[index]
  },
}