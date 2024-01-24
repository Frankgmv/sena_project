import { Router } from 'express'
import { deleteNoticia, getAllNoticias, getNoticia, postNoticia, putNoticia
} from '../../controllers/data/noticia.controller.js'
import { upload } from '../../helpers/includes.js'

const noticiaRouter = Router()

noticiaRouter.get('/noticias', getAllNoticias)
noticiaRouter.get('/noticias/:id', getNoticia)
noticiaRouter.post('/noticias', upload.single('imagen'), postNoticia)
noticiaRouter.put('/noticias/:id', upload.single('imagen'), putNoticia)
noticiaRouter.delete('/noticias/:id', deleteNoticia)

export default noticiaRouter
