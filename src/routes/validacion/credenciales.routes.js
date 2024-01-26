import { Router } from 'express'
import { test } from '../../controllers/test.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { registroSchema } from '../../schemas/validacionSchema.js'
import { postRegistro } from '../../controllers/validacion/validacion.controller.js'

const credencialesRouter = Router()

credencialesRouter.post('/login', test)
credencialesRouter.post('/registro', validateSchema(registroSchema), postRegistro)
credencialesRouter.post('/logout', test)
credencialesRouter.get('/verificar', test)
credencialesRouter.get('/perfil', test)

export default credencialesRouter
