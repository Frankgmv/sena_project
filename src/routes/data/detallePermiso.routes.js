import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { detallePermisoSchema } from '../../schemas/dataSchemas.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'
import { deleteDetallePermisos, deleteDetallePermisosParams, getDetallePermisosByDocumento, postDetallePermiso
} from '../../controllers/data/detallePermiso.controller.js'

const detallePermisoRouter = Router()

detallePermisoRouter.get('/detalle-permisos/:idUsuario', getDetallePermisosByDocumento)
detallePermisoRouter.post('/detalle-permisos', authRutas, validarPermisos('P_ADMIN'), validateSchema(detallePermisoSchema), postDetallePermiso)
detallePermisoRouter.delete('/detalle-permisos/:idDetallePermiso', authRutas, validarPermisos('P_ADMIN'), deleteDetallePermisos)
detallePermisoRouter.delete('/detalle-permisos', authRutas, validarPermisos('P_ADMIN'), deleteDetallePermisosParams)

export default (app) => app.use('/data', detallePermisoRouter)
