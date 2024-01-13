import { Router } from 'express';
import validateSchema from '../../middlewares/validarSchemas.js';
import { eventoSchema, putEventoSchema } from '../../schemas/dataSchemas.js';
import { deleteEvento, getAllEventos, getEvento, postEvento, putEvento } from '../../controllers/data/evento.controller.js';

const eventoRouter = Router();

eventoRouter.get('/eventos', getAllEventos);
eventoRouter.get('/eventos/:id', getEvento);
eventoRouter.post('/eventos',validateSchema(eventoSchema), postEvento);
eventoRouter.put('/eventos/:id',validateSchema(putEventoSchema), putEvento);
eventoRouter.delete('/eventos/:id', deleteEvento);

export default eventoRouter;