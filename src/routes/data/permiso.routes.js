import { Router } from 'express';
import validateSchema from "../../middlewares/validarSchemas.js"
import { deletePermiso, getAllPermiso, getPermiso, postPermiso, putPermiso } from '../../controllers/data/permiso.controller.js';
import { permisoSchema } from '../../schemas/dataSchemas.js';
import { validarPermisos } from '../../middlewares/validarAcciones.js';

const permisoRouter = Router();

// Obtener todos los permisos
permisoRouter.get('/permisos', getAllPermiso);

// Obtener un permiso
permisoRouter.get('/permiso/:id', getPermiso);

// Crear un permiso 
permisoRouter.post('/permiso',validateSchema(permisoSchema), postPermiso);

// Actualizar un permiso que no sea por defecto
permisoRouter.put('/permiso/:id', validateSchema(permisoSchema), validarPermisos, putPermiso);

// Eliminar un permiso que no sea por defecto
permisoRouter.delete('/permiso/:id', validarPermisos, deletePermiso);

export default permisoRouter;