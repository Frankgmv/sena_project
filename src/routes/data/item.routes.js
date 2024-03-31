import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { deleteItem, getAllItem, getItem, postItem, putItem } from '../../controllers/data/item.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const itemRouter = Router()

itemRouter.get('/items', getAllItem)
itemRouter.get('/items/:id', getItem)
itemRouter.post('/items', authRutas, validarPermisos('P_MENU'), upload.single('imagen'), postItem)
itemRouter.put('/items/:id', authRutas, validarPermisos('P_MENU'), upload.single('imagen'), putItem)
itemRouter.delete('/items/:id', authRutas, validarPermisos('P_MENU'), deleteItem)

export default (app) => app.use('/data', itemRouter)
