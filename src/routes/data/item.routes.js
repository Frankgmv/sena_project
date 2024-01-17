import { Router } from 'express'
import { test } from '../../controllers/test.js'

const itemRouter = Router()

itemRouter.get('/items', test)
itemRouter.get('/items/:id', test)
itemRouter.post('/items', test)
itemRouter.put('/items/:id', test)
itemRouter.delete('/items/:id', test)

export default itemRouter
