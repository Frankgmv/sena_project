import fs from 'fs'
import sharp from 'sharp'
import { crearNombreRecurso, deleteFile } from '../../helpers/includes.js'
import { validateSchemaInto } from '../../middlewares/validarSchemas.js'
import { itemSchema, putItemSchema } from '../../schemas/dataSchemas.js'
import { maxBytes, tiposPermitidos } from '../../variables.js'
import { deleteItemService, getAllItemService, getItemService, postItemService, putItemService
} from '../../services/data/item.services.js'

export const postItem = async (req, res, next) => {
    try {
        let bufferComprimido
        let urlPath
        let datosItem
        let bodyBuild = {
            ...req.body
        }

        if (bodyBuild.UsuarioId) {
            bodyBuild = {
                ...bodyBuild,
                UsuarioId: parseInt(bodyBuild.UsuarioId)
            }
        }

        const validarBody = validateSchemaInto(itemSchema, bodyBuild)
        if (validarBody.issues) {
            return res.status(400).json(validarBody)
        }

        let image = req.file
        if (image) {
            if (!tiposPermitidos.includes(image.mimetype)) {
                return res.status(400).json({
                    ok: false,
                    message: `Formato ${image.mimetype.split('/')[1]} inválido. [png, jpg, jpeg]`
                })
            }

            // Validar tamaña archivo
            if (image.size > maxBytes) {
                return res.status(400).json({
                    message: 'La imagen es muy grande. (10MB máx)'
                })
            }

            // Utilizamos un formato de compresión de imágenes sin pérdidas
            const buffer = Buffer.from(image.buffer, 'binary')

            const nombreArchivo = crearNombreRecurso(image)
            let proccesImage = sharp(buffer)

            const ancho = proccesImage.width
            const alto = proccesImage.height

            if (ancho > 1024 || alto > 1024) {
                const escala = Math.min(1, 1024 / ancho, 1024 / alto)
                proccesImage = proccesImage.scale(escala)
            }

            // Guardamos la imagen comprimida
            bufferComprimido = await proccesImage.toBuffer(nombreArchivo.mimetype)

            urlPath = `src/upload/${nombreArchivo.nombre}`
            datosItem = {
                ...bodyBuild,
                imgPath: nombreArchivo.nombre
            }
        } else {
            // Montar anuncio sin imagen
            datosItem = {
                ...bodyBuild,
                imgPath: null
            }
        }

        const crearItem = await postItemService(datosItem)

        res.json(crearItem)
        if (!crearItem.ok) return res.status(400)

        if (datosItem.imgPath) {
            fs.writeFileSync(urlPath, bufferComprimido)
        }
        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllItem = async (req, res, next) => {
    try {
        const items = await getAllItemService()
        res.status(200).json(items)
    } catch (error) {
        next(error)
    }
}

export const getItem = async (req, res, next) => {
    try {
        const item = await getItemService(req.params.id)

        res.json(item)
        if (!item.ok) return res.status(400)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const putItem = async (req, res, next) => {
    try {
        let bufferComprimido
        let urlPath
        let bodyBuild = {
            ...req.body
        }
        if (bodyBuild.UsuarioId) {
            const UsuarioId = parseInt(bodyBuild.UsuarioId)
            bodyBuild = {
                ...bodyBuild,
                UsuarioId
            }
        }
        let datosItem

        const validarSchemaResponse = validateSchemaInto(putItemSchema, bodyBuild)
        if (validarSchemaResponse.issues) {
            return res.status(400).json({error:true, zodError:validarSchemaResponse})
        }

        let image = req.file
        if (image) {
            if (!tiposPermitidos.includes(image.mimetype)) {
                return res.status(400).json({
                    ok: false,
                    message: `Formato ${image.mimetype.split('/')[1]} inválido. [png, jpg, jpeg]`
                })
            }

            if (image.size > maxBytes) {
                return res.status(400).json({
                    message: 'La imagen es muy grande. (10MB máx)'
                })
            }

            const buffer = Buffer.from(image.buffer, 'binary')

            const nombreArchivo = crearNombreRecurso(image)
            let proccesImage = sharp(buffer)

            const ancho = proccesImage.width
            const alto = proccesImage.height

            if (ancho > 1024 || alto > 1024) {
                const escala = Math.min(1, 1024 / ancho, 1024 / alto)
                proccesImage = proccesImage.scale(escala)
            }

            bufferComprimido = await proccesImage.toBuffer(nombreArchivo.mimetype)
            urlPath = `src/upload/${nombreArchivo.nombre}`

            datosItem = {
                ...bodyBuild,
                imgPath: nombreArchivo.nombre
            }

            const consultaItem = await getItemService(req.params.id)

            if (consultaItem.ok) {
                if (deleteFile(consultaItem.data.imgPath)) {
                    next('error al remplazar el archivo')
                }
            }
        } else {
            datosItem = {
                ...bodyBuild
            }
        }
        const actualizarItem = await putItemService(req.params.id, datosItem)
        res.json(actualizarItem)
        if (!actualizarItem.ok) return res.status(400)

        if (datosItem.imgPath) {
            fs.writeFileSync(urlPath, bufferComprimido)
        }

        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteItem = async (req, res, next) => {
    try {
        const constularItem = await getItemService(req.params.id)

        if (constularItem.ok) {
           if (deleteFile(constularItem.data.imgPath)) {
                next('error al eliminar archivo')
           }
        }

        const EliminarNoticias = await deleteItemService(req.params.id)
        res.json(EliminarNoticias)
        if (!EliminarNoticias.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
