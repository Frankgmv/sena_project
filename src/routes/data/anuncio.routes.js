import { Router } from 'express'
import { test } from '../../controllers/test.js'
import { getAllAnuncios, getAnuncio, postAnuncio } from '../../controllers/data/anuncio.controller.js'
import { upload } from '../../helpers/includes.js'

const anuncioRouter = Router()

anuncioRouter.get('/anuncios', getAllAnuncios)
anuncioRouter.get('/anuncios/:id', getAnuncio)
anuncioRouter.post('/anuncios', upload.single('imagen'), postAnuncio)
anuncioRouter.put('/anuncios/:id', test)
anuncioRouter.delete('/anuncios/:id', test)

export default anuncioRouter
