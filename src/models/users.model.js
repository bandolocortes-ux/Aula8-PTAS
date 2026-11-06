import { readUsers, writeUsers } from '../db.js'
import { ObjectId } from 'mongodb'
import { connectDatabase } from '../mongodb.js'

async function getUsersCollection() {
  const database = await connectDatabase()
  return database?.collection('users') ?? null
}

function fromDocument(document) {
  if (!document) return null
  const { _id, ...user } = document
  return { ...user, id: String(_id) }
}

function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null
}

export const usersModel = {
  async findAll() {
    const collection = await getUsersCollection()
    if (collection) {
      return (await collection.find().toArray()).map(fromDocument)
    }
    return readUsers()
  },

  async findById(id) {
    const collection = await getUsersCollection()
    if (collection) {
      const objectId = toObjectId(id)
      return objectId ? fromDocument(await collection.findOne({ _id: objectId })) : null
    }
    const numericId = Number(id)
    return (await readUsers()).find(user => user.id === numericId) ?? null
  },

  async create(data) {
    const collection = await getUsersCollection()
    if (collection) {
      const { id, ...userData } = data
      const result = await collection.insertOne(userData)
      return { ...userData, id: String(result.insertedId) }
    }

    const users = await readUsers()
    const id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1
    const user = { id, ...data }
    users.push(user)
    await writeUsers(users)
    return user
  },

  async update(id, data) {
    const collection = await getUsersCollection()
    if (collection) {
      const objectId = toObjectId(id)
      if (!objectId) return null
      const { id: ignoredId, _id, ...userData } = data
      const result = await collection.updateOne({ _id: objectId }, { $set: userData })
      return result.matchedCount ? this.findById(id) : null
    }

    const users = await readUsers()
    const numericId = Number(id)
    const index = users.findIndex(user => user.id === numericId)
    if (index === -1) return null

    users[index] = { ...users[index], ...data, id: numericId }
    await writeUsers(users)
    return users[index]
  },

  async remove(id) {
    const collection = await getUsersCollection()
    if (collection) {
      const objectId = toObjectId(id)
      if (!objectId) return null
      const result = await collection.findOneAndDelete({ _id: objectId })
      return fromDocument(result)
    }

    const users = await readUsers()
    const numericId = Number(id)
    const index = users.findIndex(user => user.id === numericId)
    if (index === -1) return null

    const [removed] = users.splice(index, 1)
    await writeUsers(users)
    return removed
  },
}