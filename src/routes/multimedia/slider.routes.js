import { Router } from 'express'
import { test } from '../../controllers/test.js'

const sliderRouter = Router()

sliderRouter.get('/slider', test)
sliderRouter.get('/slider/:id', test)
sliderRouter.post('/slider', test)
sliderRouter.put('/slider/:id', test)
sliderRouter.delete('/slider/:id', test)

export default sliderRouter
