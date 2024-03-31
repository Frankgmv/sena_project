import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { deletePermiso, getAllPermiso, getPermiso, postPermiso, putPermiso } from '../../controllers/data/permiso.controller.js'
import { permisoSchema, putPermisoSchema } from '../../schemas/dataSchemas.js'
import { validarPermisosKey } from '../../middlewares/validarAcciones.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const permisoRouter = Router()

// Obtener todos los permisos
permisoRouter.get('/permisos', getAllPermiso)

// Obtener un permiso
permisoRouter.get('/permisos/:id', getPermiso)

// Crear un permiso
permisoRouter.post('/permisos', authRutas, validarPermisos('P_ADMIN'), validateSchema(permisoSchema), postPermiso)

// Actualizar un permiso que no sea por defecto
permisoRouter.put('/permisos/:id', authRutas, validarPermisos('P_ADMIN'), validateSchema(putPermisoSchema), validarPermisosKey, putPermiso)

// Eliminar un permiso que no sea por defecto
permisoRouter.delete('/permisos/:id', authRutas, validarPermisos('P_ADMIN'), validarPermisosKey, deletePermiso)

export default (app) => app.use('/data', permisoRouter)
