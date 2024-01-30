import { Router } from 'express'
import { deleteVistas, getVistas, postVistas } from '../../controllers/informacion/vistas.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const vistasRouter = Router()

vistasRouter.get('/vistas', getVistas)
vistasRouter.post('/vistas', postVistas)
vistasRouter.delete('/vistas', authRutas, deleteVistas)

export default vistasRouter
