'use strict'

import express from 'express'
import { register, login, updateUser } from './user.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/register', register)
api.post('/login', login)
api.put('/updateUser', [validateJwt], updateUser)
export default api