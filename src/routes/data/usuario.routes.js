import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { usuarioPutSchema, usuarioSchema } from '../../schemas/dataSchemas.js'
import { deleteUsuario, getAllUsuarios, getUsuario, postUsuario, putUsuario } from '../../controllers/data/usuario.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const usuarioRouter = Router()

usuarioRouter.get('/usuarios', authRutas, getAllUsuarios)
usuarioRouter.get('/usuarios/:id', authRutas, getUsuario)
usuarioRouter.post('/usuarios', authRutas, validateSchema(usuarioSchema), postUsuario)
usuarioRouter.put('/usuarios/:id', authRutas, validateSchema(usuarioPutSchema), putUsuario)
usuarioRouter.delete('/usuarios/:id', authRutas, deleteUsuario)

export default usuarioRouter
