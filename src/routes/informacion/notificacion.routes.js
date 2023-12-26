import {
    Router
} from 'express';

import {
    deleteAllNotificaciones,
    deleteNotificacion,
    getAllNotificaciones,
    getNotificaciones,
    postNotificacion,
    putNotificacion
} from "../../controllers/informacion/notificacion.controller.js";
import validateSchema from "../../middlewares/validarSchemas.js";
import {
    notificacionSchema
} from "../../schemas/informacionSchemas.js";

const notificacionRouter = Router();

//? Obtener todas las notificaciones
notificacionRouter.get('/notificaciones', getAllNotificaciones);

//? Obtener notificaciones
notificacionRouter.get('/notificacion/:id', getNotificaciones);

//? Publicar y validar notificaciones
notificacionRouter.post('/notificacion', validateSchema(notificacionSchema), postNotificacion);

//? Actualizar notificaciones
notificacionRouter.put('/notificacion/:id', putNotificacion);

//? Eliminar notificaciones
notificacionRouter.delete('/notificacion/:id', deleteNotificacion);

//? Eliminar todas las notificaciones leídas
notificacionRouter.delete('/notificaciones', deleteAllNotificaciones);

export default notificacionRouter;