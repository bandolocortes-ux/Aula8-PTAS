import { readProducts, writeProducts } from '../db.js'

export const productsModel = {
  async findAll() {
    return readProducts()
  },

  async findById(id) {
    return (await readProducts()).find(product => product.id === id) ?? null
  },

  async create(data) {
    const products = await readProducts()
    const id = products.length ? Math.max(...products.map(product => product.id)) + 1 : 1
    const product = { id, ...data }
    products.push(product)
    await writeProducts(products)
    return product
  },

  async update(id, data) {
    const products = await readProducts()
    const index = products.findIndex(product => product.id === id)
    if (index === -1) return null

    products[index] = { ...products[index], ...data, id }
    await writeProducts(products)
    return products[index]
  },

  async remove(id) {
    const products = await readProducts()
    const index = products.findIndex(product => product.id === id)
    if (index === -1) return null

    const [removed] = products.splice(index, 1)
    await writeProducts(products)
    return removed
  },
}