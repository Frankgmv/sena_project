import { Router } from 'express'
import { postGaleria, getAllGaleria, getGaleria, putGaleria, deleteGaleria } from '../../controllers/multimedia/galeria.controller.js'
import { upload } from '../../helpers/includes.js'

const galeriaRouter = Router()

galeriaRouter.get('/galeria', getAllGaleria)
galeriaRouter.get('/galeria/:id', getGaleria)
galeriaRouter.post('/galeria', upload.single('imagen'), postGaleria)
galeriaRouter.put('/galeria/:id', upload.single('imagen'), putGaleria)
galeriaRouter.delete('/galeria/:id', deleteGaleria)

export default galeriaRouter
