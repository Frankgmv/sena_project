import { Router } from 'express'
import { deleteVistas, getVistas, postVistas } from '../../controllers/informacion/vistas.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const vistasRouter = Router()

vistasRouter.get('/vistas', getVistas)
vistasRouter.post('/vistas', postVistas)
vistasRouter.delete('/vistas', authRutas, validarPermisos('P_ADMIN'), deleteVistas)

export default (app) => app.use('/informacion', vistasRouter)
