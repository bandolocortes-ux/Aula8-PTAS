import { MongoClient } from 'mongodb'

let client
let databasePromise

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) return null
  if (databasePromise) return databasePromise

  client = new MongoClient(process.env.MONGODB_URI)
  databasePromise = client.connect()
    .then(async () => {
      const database = client.db(process.env.MONGODB_DATABASE ?? 'ptas3')
      await database.command({ ping: 1 })
      return database
    })
    .catch(async error => {
      await client.close().catch(() => {})
      client = undefined
      databasePromise = undefined
      throw error
    })

  return databasePromise
}