import { Router } from 'express'
import { deleteAnuncio, getAllAnuncios, getAnuncio, postAnuncio, putAnuncio } from '../../controllers/data/anuncio.controller.js'
import { upload } from '../../helpers/includes.js'

const anuncioRouter = Router()

anuncioRouter.get('/anuncios', getAllAnuncios)
anuncioRouter.get('/anuncios/:id', getAnuncio)
anuncioRouter.post('/anuncios', upload.single('imagen'), postAnuncio)
anuncioRouter.put('/anuncios/:id', upload.single('imagen'), putAnuncio)
anuncioRouter.delete('/anuncios/:id', deleteAnuncio)

export default anuncioRouter
