import { Router } from 'express'
import { test } from '../../controllers/test.js'

const galeriaRouter = Router()

galeriaRouter.get('/galeria', test)
galeriaRouter.get('/galeria/:id', test)
galeriaRouter.post('/galeria', test)
galeriaRouter.put('/galeria/:id', test)

export default galeriaRouter
