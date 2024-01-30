import { Router } from 'express'
import { deleteAnuncio, getAllAnuncios, getAnuncio, postAnuncio, putAnuncio } from '../../controllers/data/anuncio.controller.js'
import { upload } from '../../helpers/includes.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const anuncioRouter = Router()

anuncioRouter.get('/anuncios', getAllAnuncios)
anuncioRouter.get('/anuncios/:id', getAnuncio)
anuncioRouter.post('/anuncios', authRutas, upload.single('imagen'), postAnuncio)
anuncioRouter.put('/anuncios/:id', authRutas, upload.single('imagen'), putAnuncio)
anuncioRouter.delete('/anuncios/:id', authRutas, deleteAnuncio)

export default anuncioRouter
