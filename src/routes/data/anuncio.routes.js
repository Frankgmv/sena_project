import { Router } from 'express';
import { test } from "../../controllers/test.js";

const anuncioRouter = Router();

anuncioRouter.get('/anuncios', test);
anuncioRouter.get('/anuncio/:id', test);
anuncioRouter.post('/anuncio', test);
anuncioRouter.put('/anuncio/:id', test);
anuncioRouter.delete('/anuncio/:id', test);

export default anuncioRouter;