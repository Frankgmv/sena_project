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
credencialesRouter.get('/test', (req, res, next) => {
    try {
        res.cookie('test', 'valor cookie para token')
        .status(200).json({ message: 'Creado' })
    } catch (error) {
        next(error)
    }
})

export default credencialesRouter
