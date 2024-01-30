import { Router } from 'express'
import { test } from '../../controllers/test.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { loginSchema, registroSchema } from '../../schemas/validacionSchema.js'
import { login, logout, postRegistro } from '../../controllers/validacion/validacion.controller.js'

const credencialesRouter = Router()

credencialesRouter.post('/login', validateSchema(loginSchema), login)
credencialesRouter.post('/registro', validateSchema(registroSchema), postRegistro)
credencialesRouter.post('/logout', logout)
credencialesRouter.get('/verificar', test)
credencialesRouter.get('/perfil', test)

export default credencialesRouter
