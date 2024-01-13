import { Router } from 'express';
import validateSchema from '../../middlewares/validarSchemas.js';
import { historialSchema } from '../../schemas/informacionSchemas.js'
import { postHistorial, getHistorial, getAllHistorial, deleteHistorial} from '../../controllers/informacion/historial.controller.js'

const historialRouter = Router();

historialRouter.get('/historial', getAllHistorial);
historialRouter.get('/historial/:id', getHistorial);
historialRouter.post('/historial', validateSchema(historialSchema), postHistorial);
historialRouter.delete('/historial/:id', deleteHistorial);

export default historialRouter;