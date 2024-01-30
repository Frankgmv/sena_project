import {
    Router
} from 'express'

import {
    deleteAllNotificaciones,
    deleteNotificacion,
    getAllNotificaciones,
    getNotificaciones,
    postNotificacion,
    putNotificacion
} from '../../controllers/informacion/notificacion.controller.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import {
    notificacionSchema
} from '../../schemas/informacionSchemas.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const notificacionRouter = Router()

// ? Obtener todas las notificaciones
notificacionRouter.get('/notificaciones', authRutas, getAllNotificaciones)

// ? Obtener notificaciones
notificacionRouter.get('/notificaciones/:id', authRutas, getNotificaciones)

// ? Publicar y validar notificaciones
notificacionRouter.post('/notificaciones', authRutas, validateSchema(notificacionSchema), postNotificacion)

// ? Actualizar notificaciones
notificacionRouter.put('/notificaciones/:id', authRutas, putNotificacion)

// ? Eliminar notificaciones
notificacionRouter.delete('/notificaciones/:id', authRutas, deleteNotificacion)

// ? Eliminar todas las notificaciones leídas
notificacionRouter.delete('/notificaciones-delete-all', authRutas, deleteAllNotificaciones)

export default notificacionRouter
