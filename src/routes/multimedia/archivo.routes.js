import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { deleteArchivo, getArchivo, postArchivo } from '../../controllers/multimedia/archivo.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const archivoRouter = Router()

archivoRouter.get('/archivos', getArchivo)
archivoRouter.post('/archivos', authRutas, upload.single('archivo'), postArchivo)
archivoRouter.delete('/archivos', authRutas, deleteArchivo)

export default archivoRouter
