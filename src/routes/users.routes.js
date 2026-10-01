import { Router } from 'express'
import { createUser, updateUser } from '../controllers/users.controller.js'

const router = Router()

router.post('/', createUser)
router.put('/:id', updateUser)

export default router