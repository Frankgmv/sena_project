import { Router } from 'express'
import { deleteNoticia, getAllNoticias, getNoticia, postNoticia, putNoticia
} from '../../controllers/data/noticia.controller.js'
import { upload } from '../../helpers/includes.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const noticiaRouter = Router()

noticiaRouter.get('/noticias', getAllNoticias)
noticiaRouter.get('/noticias/:id', getNoticia)
noticiaRouter.post('/noticias', authRutas, upload.single('imagen'), postNoticia)
noticiaRouter.put('/noticias/:id', authRutas, upload.single('imagen'), putNoticia)
noticiaRouter.delete('/noticias/:id', authRutas, deleteNoticia)

export default noticiaRouter
