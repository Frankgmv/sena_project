import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { deleteArchivo, getArchivo, postArchivo } from '../../controllers/multimedia/archivo.controller.js'

const archivoRouter = Router()

archivoRouter.get('/archivos', getArchivo)
archivoRouter.post('/archivos', upload.single('archivo'), postArchivo)
archivoRouter.delete('/archivos', deleteArchivo)

export default archivoRouter
