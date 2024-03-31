import { Router } from 'express'
import { postGaleria, getAllGaleria, getGaleria, putGaleria, deleteGaleria } from '../../controllers/multimedia/galeria.controller.js'
import { upload } from '../../helpers/includes.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const galeriaRouter = Router()

galeriaRouter.get('/galeria', getAllGaleria)
galeriaRouter.get('/galeria/:id', getGaleria)
galeriaRouter.post('/galeria', authRutas, validarPermisos('P_GALERIA'), upload.single('imagen'), postGaleria)
galeriaRouter.put('/galeria/:id', authRutas, validarPermisos('P_GALERIA'), upload.single('imagen'), putGaleria)
galeriaRouter.delete('/galeria/:id', authRutas, validarPermisos('P_GALERIA'), deleteGaleria)

export default (app) => app.use('/multimedia', galeriaRouter)
