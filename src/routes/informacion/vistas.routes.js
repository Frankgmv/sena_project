import { Router } from 'express';
import { deleteVistas, getVistas, postVistas } from '../../controllers/informacion/vistas.controller.js';

const vistasRouter = Router();

vistasRouter.get('/vista', getVistas);
vistasRouter.post('/vista', postVistas);
vistasRouter.delete('/vista', deleteVistas);

export default vistasRouter;