import { Router } from 'express'
import { deleteVistas, getVistas, postVistas } from '../../controllers/informacion/vistas.controller.js'

const vistasRouter = Router()

vistasRouter.get('/vistas', getVistas)
vistasRouter.post('/vistas', postVistas)
vistasRouter.delete('/vistas', deleteVistas)

export default vistasRouter
