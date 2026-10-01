import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const dataDirectory = join(dirname(fileURLToPath(import.meta.url)), '../data')

async function readCollection(collection) {
  const filePath = join(dataDirectory, `${collection}.json`)

  try {
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    return []
  }
}

async function writeCollection(collection, records) {
  await mkdir(dataDirectory, { recursive: true })
  await writeFile(join(dataDirectory, `${collection}.json`), `${JSON.stringify(records, null, 2)}\n`)
}

export const readUsers = () => readCollection('users')
export const writeUsers = records => writeCollection('users', records)
export const readProducts = () => readCollection('products')
export const writeProducts = records => writeCollection('products', records)