import { Router } from 'express'
import { login, logout, perfil, postRegistro, verificarToken } from '../../controllers/validacion/validacion.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { loginSchema, registroSchema } from '../../schemas/validacionSchema.js'

const credencialesRouter = Router()

credencialesRouter.post('/login', validateSchema(loginSchema), login)
credencialesRouter.post('/registro', validateSchema(registroSchema), postRegistro)
credencialesRouter.post('/logout', logout)
credencialesRouter.get('/verificar', verificarToken)
credencialesRouter.get('/perfil', authRutas, perfil)

export default (app) => app.use('/validacion', credencialesRouter)
