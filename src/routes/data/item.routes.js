import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { deleteItem, getAllItem, getItem, postItem, putItem } from '../../controllers/data/item.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const itemRouter = Router()

itemRouter.get('/items', getAllItem)
itemRouter.get('/items/:id', getItem)
itemRouter.post('/items', authRutas, upload.single('imagen'), postItem)
itemRouter.put('/items/:id', authRutas, upload.single('imagen'), putItem)
itemRouter.delete('/items/:id', authRutas, deleteItem)

export default itemRouter
