import { Router } from 'express';
import { test } from "../../controllers/test.js";

const anuncioRouter = Router();

anuncioRouter.get('/anuncios', test);
anuncioRouter.get('/anuncios/:id', test);
anuncioRouter.post('/anuncios', test);
anuncioRouter.put('/anuncios/:id', test);
anuncioRouter.delete('/anuncios/:id', test);

export default anuncioRouter;