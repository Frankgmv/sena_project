import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { usuarioPutSchema, usuarioSchema } from '../../schemas/dataSchemas.js'
import { deleteUsuario, getAllUsuarios, getUsuario, postUsuario, putUsuario } from '../../controllers/data/usuario.controller.js'

const usuarioRouter = Router()

usuarioRouter.get('/usuarios', getAllUsuarios)
usuarioRouter.get('/usuarios/:id', getUsuario)
usuarioRouter.post('/usuarios', validateSchema(usuarioSchema), postUsuario)
usuarioRouter.put('/usuarios/:id', validateSchema(usuarioPutSchema), putUsuario)
usuarioRouter.delete('/usuarios/:id', deleteUsuario)

export default usuarioRouter
