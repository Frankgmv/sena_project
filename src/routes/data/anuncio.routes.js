import { Router } from 'express';
import { test } from "../../controllers/test.js";
import validateSchema from '../../middlewares/validarSchemas.js';
import { anuncioSchema, putAnuncioSchema } from '../../schemas/dataSchemas.js';
import { postAnuncio } from '../../controllers/data/anuncio.controller.js';
import { upload } from '../../helpers/includes.js';

const anuncioRouter = Router();




anuncioRouter.get('/anuncios', test);
anuncioRouter.get('/anuncios/:id', test);
anuncioRouter.post('/anuncios',validateSchema(anuncioSchema), upload.single("file"), postAnuncio);
anuncioRouter.put('/anuncios/:id',validateSchema(putAnuncioSchema), test);
anuncioRouter.delete('/anuncios/:id', test);

export default anuncioRouter;