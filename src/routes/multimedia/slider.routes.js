import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { sliderSchema } from '../../schemas/MultimediaSchemas.js'
import { deleteSlider, getAllSlider, getSlider, postSlider } from '../../controllers/multimedia/slider.controller.js'

const sliderRouter = Router()

sliderRouter.get('/slider', getAllSlider)
sliderRouter.get('/slider/:id', getSlider)
sliderRouter.post('/slider', validateSchema(sliderSchema), postSlider)
sliderRouter.delete('/slider/:id', deleteSlider)

export default sliderRouter