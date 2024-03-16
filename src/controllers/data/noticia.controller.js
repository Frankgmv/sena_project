import fs from 'fs'
import sharp from 'sharp'
import { crearNombreRecurso, deleteFile } from '../../helpers/includes.js'
import { validateSchemaInto } from '../../middlewares/validarSchemas.js'
import { noticiaShema, putNoticiaShema } from '../../schemas/dataSchemas.js'
import { maxBytes, tiposPermitidos } from '../../variables.js'
import { deleteNoticiaService, getAllNoticiasService, getNoticiaService, postNoticiaService, putNoticiaService
} from '../../services/data/noticia.services.js'

export const postNoticia = async (req, res, next) => {
    try {
        let bodyBuild = {}
        let datosNoticia
        const UsuarioId = parseInt(req.body.UsuarioId)
        bodyBuild = {
            ...req.body,
            UsuarioId
        }

        let bufferComprimido
        let urlPath
        // validar la schema para los datos
        const validarSchemaResponse = validateSchemaInto(noticiaShema, bodyBuild)
        if (validarSchemaResponse.issues) {
            return res.status(400).json({error:true, zodError:validarSchemaResponse})
        }

        let image = req.file
        if (image) {
            // Validar tipos permitodos
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

            // Utilizamos un formato de compresión de imagenes sin pérdidas
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
            urlPath = `var/data/${nombreArchivo.nombre}`

            datosNoticia = {
                ...bodyBuild,
                imgPath: nombreArchivo.nombre
            }
        } else {
            // Montar anuncio sin imagen
            datosNoticia = {
                ...bodyBuild,
                imgPath: null
            }
        }

        const crearNoticia = await postNoticiaService(datosNoticia)
        res.json(crearNoticia)
        if (!crearNoticia.ok) return res.status(400)

        if (datosNoticia.imgPath) {
            fs.writeFileSync(urlPath, bufferComprimido)
        }

        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllNoticias = async (req, res, next) => {
    try {
        const {
            pagina,
            estado,
            limite
        } = req.query
        const estadoNoticia = estado || 'todas'
        const numPagina = parseInt(pagina || 1)
        const limiteNoticia = parseInt(limite || 1000)

        const noticias = await getAllNoticiasService(estadoNoticia, numPagina, limiteNoticia)
        res.json(noticias)
        if (!noticias.ok) return res.status(400)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const getNoticia = async (req, res, next) => {
    try {
        const noticias = await getNoticiaService(req.params.id)
        res.json(noticias)
        if (!noticias.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const putNoticia = async (req, res, next) => {
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
        let datosNoticia

        const validarSchemaResponse = validateSchemaInto(putNoticiaShema, bodyBuild)
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
            urlPath = `var/data/${nombreArchivo.nombre}`

            datosNoticia = {
                ...bodyBuild,
                imgPath: nombreArchivo.nombre
            }

            const consultaNoticia = await getNoticiaService(req.params.id)

            if (consultaNoticia.ok) {
                if (deleteFile(consultaNoticia.data.imgPath)) {
                    next('error al remplazar el archivo')
                }
            }
        } else {
            datosNoticia = {
                ...bodyBuild
            }
        }
        const actualizarNoticia = await putNoticiaService(req.params.id, datosNoticia)
        res.json(actualizarNoticia)
        if (!actualizarNoticia.ok) return res.status(400)

        if (datosNoticia.imgPath) {
            fs.writeFileSync(urlPath, bufferComprimido)
        }

        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteNoticia = async (req, res, next) => {
    try {
        const consultaNoticia = await getNoticiaService(req.params.id)

        if (consultaNoticia.ok) {
            if (deleteFile(consultaNoticia.data.imgPath)) {
                next('error al eliminar el archivo')
            }
        }

        const EliminarNoticias = await deleteNoticiaService(req.params.id)
        res.json(EliminarNoticias)
        if (!EliminarNoticias.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
