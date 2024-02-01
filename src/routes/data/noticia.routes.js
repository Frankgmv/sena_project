import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'
import { deleteNoticia, getAllNoticias, getNoticia, postNoticia, putNoticia
} from '../../controllers/data/noticia.controller.js'

const noticiaRouter = Router()

noticiaRouter.get('/noticias', getAllNoticias)
noticiaRouter.get('/noticias/:id', getNoticia)
noticiaRouter.post('/noticias', authRutas, validarPermisos('P_NOTICIAS'), upload.single('imagen'), postNoticia)
noticiaRouter.put('/noticias/:id', authRutas, validarPermisos('P_NOTICIAS'), upload.single('imagen'), putNoticia)
noticiaRouter.delete('/noticias/:id', authRutas, validarPermisos('P_NOTICIAS'), deleteNoticia)

export default noticiaRouter
