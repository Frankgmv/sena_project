import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { deleteItem, getAllItem, getItem, postItem, putItem } from '../../controllers/data/item.controller.js'

const itemRouter = Router()

itemRouter.get('/items', getAllItem)
itemRouter.get('/items/:id', getItem)
itemRouter.post('/items', upload.single('imagen'), postItem)
itemRouter.put('/items/:id', upload.single('imagen'), putItem)
itemRouter.delete('/items/:id', deleteItem)

export default itemRouter
