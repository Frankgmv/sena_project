import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { deletePermiso, getAllPermiso, getPermiso, postPermiso, putPermiso } from '../../controllers/data/permiso.controller.js'
import { permisoSchema, putPermisoSchema } from '../../schemas/dataSchemas.js'
import { validarPermisos } from '../../middlewares/validarAcciones.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const permisoRouter = Router()

// Obtener todos los permisos
permisoRouter.get('/permisos', authRutas, getAllPermiso)

// Obtener un permiso
permisoRouter.get('/permisos/:id', authRutas, getPermiso)

// Crear un permiso
permisoRouter.post('/permisos', authRutas, validateSchema(permisoSchema), postPermiso)

// Actualizar un permiso que no sea por defecto
permisoRouter.put('/permisos/:id', authRutas, validateSchema(putPermisoSchema), validarPermisos, putPermiso)

// Eliminar un permiso que no sea por defecto
permisoRouter.delete('/permisos/:id', authRutas, validarPermisos, deletePermiso)

export default permisoRouter
