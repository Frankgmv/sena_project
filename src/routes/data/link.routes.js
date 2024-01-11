import { Router } from 'express';
import { deleteLink, getAllLink, postLink, putLink } from '../../controllers/data/link.controller.js';
import validateSchema from '../../middlewares/validarSchemas.js';
import { linkSchema, putLinkSchema } from '../../schemas/dataSchemas.js';

const linkRouter = Router();

linkRouter.get('/links', getAllLink);
linkRouter.post('/links', validateSchema(linkSchema), postLink);
linkRouter.put('/links/:id',validateSchema(putLinkSchema), putLink);
linkRouter.delete('/links/:id', deleteLink);

export default linkRouter;