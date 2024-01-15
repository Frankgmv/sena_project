import { Router } from 'express'
import { test } from '../../controllers/test.js'
import { postAnuncio } from '../../controllers/data/anuncio.controller.js'
import { upload } from '../../helpers/includes.js'

const anuncioRouter = Router()

anuncioRouter.get('/anuncios', test)
anuncioRouter.get('/anuncios/:id', test)
anuncioRouter.post('/anuncios', upload.single('imagen'), postAnuncio)
anuncioRouter.put('/anuncios/:id', test)
anuncioRouter.delete('/anuncios/:id', test)

export default anuncioRouter
