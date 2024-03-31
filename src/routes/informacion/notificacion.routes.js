import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { notificacionSchema } from '../../schemas/informacionSchemas.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'
import { deleteAllNotificaciones, deleteNotificacion, getAllNotificaciones, getNotificaciones, postNotificacion, putNotificacion
} from '../../controllers/informacion/notificacion.controller.js'

const notificacionRouter = Router()

// ? Obtener todas las notificaciones
notificacionRouter.get('/notificaciones', getAllNotificaciones)

// ? Obtener notificaciones
notificacionRouter.get('/notificaciones/:id', getNotificaciones)

// ? Publicar y validar notificaciones
notificacionRouter.post('/notificaciones', authRutas, validarPermisos('P_NOTIFICACIONES'), validateSchema(notificacionSchema), postNotificacion)

// ? Actualizar notificaciones
notificacionRouter.put('/notificaciones/:id', authRutas, validarPermisos('P_NOTIFICACIONES'), putNotificacion)

// ? Eliminar notificaciones
notificacionRouter.delete('/notificaciones/:id', authRutas, validarPermisos('P_NOTIFICACIONES'), deleteNotificacion)

// ? Eliminar todas las notificaciones leídas
notificacionRouter.delete('/notificaciones-delete-all', authRutas, validarPermisos('P_NOTIFICACIONES'), deleteAllNotificaciones)

export default (app) => app.use('/informacion', notificacionRouter)
