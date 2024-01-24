import { Router } from 'express'
import { test } from '../../controllers/test.js'

const registroRouter = Router()

registroRouter.post('/registro', test)

export default registroRouter
