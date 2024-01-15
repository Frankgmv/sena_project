import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { deletePermiso, getAllPermiso, getPermiso, postPermiso, putPermiso } from '../../controllers/data/permiso.controller.js'
import { permisoSchema, putPermisoSchema } from '../../schemas/dataSchemas.js'
import { validarPermisos } from '../../middlewares/validarAcciones.js'

const permisoRouter = Router()

// Obtener todos los permisos
permisoRouter.get('/permisos', getAllPermiso)

// Obtener un permiso
permisoRouter.get('/permisos/:id', getPermiso)

// Crear un permiso
permisoRouter.post('/permisos', validateSchema(permisoSchema), postPermiso)

// Actualizar un permiso que no sea por defecto
permisoRouter.put('/permisos/:id', validateSchema(putPermisoSchema), validarPermisos, putPermiso)

// Eliminar un permiso que no sea por defecto
permisoRouter.delete('/permisos/:id', validarPermisos, deletePermiso)

export default permisoRouter
