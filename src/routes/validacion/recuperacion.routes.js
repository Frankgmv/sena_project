import { Router } from 'express'
import { postCrearCodigo, postValidarCodigo, updatePassword } from '../../controllers/validacion/recuperacion.controller.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { validacionRecuperacionSchema, crearRecuperacionSchema, cambiarPassword } from '../../schemas/validacionSchema.js'

const recuperacionRouter = Router()

recuperacionRouter.post('/crear-codigo', validateSchema(crearRecuperacionSchema), postCrearCodigo)
recuperacionRouter.post('/validar-codigo', validateSchema(validacionRecuperacionSchema), postValidarCodigo)
recuperacionRouter.put('/nuevo-password/:id', validateSchema(cambiarPassword), updatePassword)

export default (app) => app.use('/recuperacion', recuperacionRouter)
