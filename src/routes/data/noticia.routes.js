import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { noticiaShema, putNoticiaShema } from '../../schemas/dataSchemas.js'
import { deleteNoticia, getAllNoticias, getNoticia, postNoticia, putNoticia
} from '../../controllers/data/noticia.controller.js'

const noticiaRouter = Router()

noticiaRouter.get('/noticias', getAllNoticias)
noticiaRouter.get('/noticias/:id', getNoticia)
noticiaRouter.post('/noticias', validateSchema(noticiaShema), postNoticia)
noticiaRouter.put('/noticias/:id', validateSchema(putNoticiaShema),  putNoticia)
noticiaRouter.delete('/noticias/:id', deleteNoticia)

export default noticiaRouter
