import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { usuarioPutSchema, usuarioSchema } from '../../schemas/dataSchemas.js'
import { deleteUsuario, getAllUsuarios, getUsuario, postUsuario, putUsuario } from '../../controllers/data/usuario.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const usuarioRouter = Router()

usuarioRouter.get('/usuarios', getAllUsuarios)
usuarioRouter.get('/usuarios/:id', getUsuario)
usuarioRouter.post('/usuarios', authRutas, validarPermisos('P_USUARIOS'), validateSchema(usuarioSchema), postUsuario)
usuarioRouter.put('/usuarios/:id', authRutas, validarPermisos('P_USUARIOS'), validateSchema(usuarioPutSchema), putUsuario)
usuarioRouter.delete('/usuarios/:id', authRutas, validarPermisos('P_ADMIN'), deleteUsuario)

export default usuarioRouter
