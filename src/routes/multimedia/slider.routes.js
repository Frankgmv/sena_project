import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { sliderSchema } from '../../schemas/MultimediaSchemas.js'
import { deleteSlider, getAllSlider, getSlider, postSlider } from '../../controllers/multimedia/slider.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const sliderRouter = Router()

sliderRouter.get('/slider', getAllSlider)
sliderRouter.get('/slider/:id', getSlider)
sliderRouter.post('/slider', authRutas, validarPermisos('P_SLIDER'), validateSchema(sliderSchema), postSlider)
sliderRouter.delete('/slider/:id', authRutas, validarPermisos('P_SLIDER'), deleteSlider)

export default sliderRouter
