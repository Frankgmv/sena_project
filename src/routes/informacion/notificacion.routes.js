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

const notificacionRouter = Router()

// ? Obtener todas las notificaciones
notificacionRouter.get('/notificaciones', getAllNotificaciones)

// ? Obtener notificaciones
notificacionRouter.get('/notificaciones/:id', getNotificaciones)

// ? Publicar y validar notificaciones
notificacionRouter.post('/notificaciones', validateSchema(notificacionSchema), postNotificacion)

// ? Actualizar notificaciones
notificacionRouter.put('/notificaciones/:id', putNotificacion)

// ? Eliminar notificaciones
notificacionRouter.delete('/notificaciones/:id', deleteNotificacion)

// ? Eliminar todas las notificaciones leídas
notificacionRouter.delete('/notificaciones-delete-all', deleteAllNotificaciones)

export default notificacionRouter
