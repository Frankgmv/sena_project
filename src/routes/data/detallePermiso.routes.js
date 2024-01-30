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

const detallePermisoRouter = Router()

detallePermisoRouter.get('/detalle-permisos/:idUsuario', authRutas, getDetallePermisosByDocumento)
detallePermisoRouter.post('/detalle-permisos', authRutas, validateSchema(detallePermisoSchema), postDetallePermiso)
detallePermisoRouter.delete('/detalle-permisos/:idDetallePermiso', authRutas, deleteDetallePermisos)

export default detallePermisoRouter
