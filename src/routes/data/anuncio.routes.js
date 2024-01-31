import { Router } from 'express'
import { deleteAnuncio, getAllAnuncios, getAnuncio, postAnuncio, putAnuncio } from '../../controllers/data/anuncio.controller.js'
import { upload } from '../../helpers/includes.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const anuncioRouter = Router()

anuncioRouter.get('/anuncios', getAllAnuncios)
anuncioRouter.get('/anuncios/:id', getAnuncio)
anuncioRouter.post('/anuncios', authRutas, validarPermisos('P_ANUNCIOS'), upload.single('imagen'), postAnuncio)
anuncioRouter.put('/anuncios/:id', authRutas, validarPermisos('P_ANUNCIOS'), upload.single('imagen'), putAnuncio)
anuncioRouter.delete('/anuncios/:id', authRutas, validarPermisos('P_ANUNCIOS'), deleteAnuncio)

export default anuncioRouter
