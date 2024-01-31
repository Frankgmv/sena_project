import {
    Router
} from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import {
    detallePermisoSchema
} from '../../schemas/dataSchemas.js'
import { deleteDetallePermisos, getDetallePermisosByDocumento, postDetallePermiso
} from '../../controllers/data/detallePermiso.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const detallePermisoRouter = Router()

detallePermisoRouter.get('/detalle-permisos/:idUsuario', authRutas, validarPermisos('P_ADMIN'), getDetallePermisosByDocumento)
detallePermisoRouter.post('/detalle-permisos', authRutas, validarPermisos('P_ADMIN'), validateSchema(detallePermisoSchema), postDetallePermiso)
detallePermisoRouter.delete('/detalle-permisos/:idDetallePermiso', authRutas, deleteDetallePermisos)

export default detallePermisoRouter
