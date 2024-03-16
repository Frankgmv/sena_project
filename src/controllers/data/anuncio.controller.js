import fs from 'fs'
import sharp from 'sharp'
import { crearNombreRecurso, deleteFile } from '../../helpers/includes.js'
import { validateSchemaInto } from '../../middlewares/validarSchemas.js'
import { anuncioSchema, putAnuncioSchema } from '../../schemas/dataSchemas.js'
import { maxBytes, tiposPermitidos } from '../../variables.js'
import { postNotificacionService } from '../../services/informacion/notificacion.services.js'
import { deleteAnuncioService, getAllAnunciosService, getAnuncioService,
         postAnucioService, putAnuncioService
} from '../../services/data/anuncio.services.js'

export const postAnuncio = async (req, res, next) => {
    try {
        // Parsear Las Usuario y Seccion Id's del body
        let datosAnuncio
        const UsuarioId = parseInt(req.body.UsuarioId)
        const SeccionId = parseInt(req.body.SeccionId)
        let bodyBuild = {
            ...req.body,
            UsuarioId,
            SeccionId
        }
        let bufferComprimido
        let urlPath
        // validar la schema para los datos
        const validarSchemaResponse = validateSchemaInto(anuncioSchema, bodyBuild)

        // Retornar errores si hay en la validacion de la shema
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

            datosAnuncio = {
                ...bodyBuild,
                imgPath: nombreArchivo.nombre
            }
        } else {
            // Montar anuncio sin imagen
            datosAnuncio = {
                ...bodyBuild,
                imgPath: null
            }
        }

        // Guardar anuncio
        const guardar = await postAnucioService(datosAnuncio)

        if (!guardar.ok) {
            return res.status(400).json(guardar)
        }
        // Noficiar nuevo anuncio
        if (datosAnuncio.imgPath) {
            fs.writeFileSync(urlPath, bufferComprimido)
        }

        await postNotificacionService({
            titulo: `Nuevos Anuncio`,
            descripcion: `Revisa tu apartado de anuncios`
        })
        res.status(201).json(guardar)
    } catch (error) {
        next(error)
    }
}

export const getAllAnuncios = async (req, res, next) => {
    const {
        seccionKey
    } = req.query
    let seccionKeyRes = seccionKey || 'todos'

    try {
        const anuncios = await getAllAnunciosService(seccionKeyRes)
        res.json(anuncios)
        if (!anuncios.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const getAnuncio = async (req, res, next) => {
    try {
        const anuncio = await getAnuncioService(req.params.id)
        res.json(anuncio)
        if (!anuncio.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const putAnuncio = async (req, res, next) => {
    try {
        let bufferComprimido
        let urlPath

        let bodyBuild = {
            ...req.body
        }

        if (req.body.UsuarioId) {
            const UsuarioId = parseInt(req.body.UsuarioId)
            bodyBuild = {
                ...bodyBuild,
                UsuarioId
            }
        }
        let datosAnuncio

        const validarSchemaResponse = validateSchemaInto(putAnuncioSchema, bodyBuild)
        if (validarSchemaResponse.issues) {
            return res.status(400).json({error:true, zodError:validarSchemaResponse})
        }

        let image = req.file
        if (image) {
            if (!tiposPermitidos.includes(image.mimetype)) {
                return res.status(400).json({
                    ok: false,
                    message: `Formato ${image.mimetype.split('/'[1])} inválido . [png, jpg, jpeg]`
                })
            }

            if (image.size > maxBytes) {
                return res.status(400).json({
                    message: 'La imagen es muy grande. (10MB máx)'
                })
            }
            const buffer = Buffer.from(image.buffer, 'binary')

            const nombreArchivo = crearNombreRecurso(image)
            let processImage = sharp(buffer)

            const ancho = processImage.with
            const alto = processImage.height

            if (ancho > 1024 || alto > 1024) {
                const escala = Math.min(1, 1024 / ancho, 1024 / alto)
                processImage = processImage.scale(escala)
            }

            bufferComprimido = await processImage.toBuffer(nombreArchivo.mimetype)
            urlPath = `var/data/${nombreArchivo.nombre}`

            datosAnuncio = {
                ...bodyBuild,
                imgPath: nombreArchivo.nombre
            }

            const consultaAnuncio = await getAnuncioService(req.params.id)
            if (consultaAnuncio.ok) {
                if (deleteFile(consultaAnuncio.data.imgPath)) {
                    next('error al remplazar el archivo')
                }
            }
        } else {
            datosAnuncio = {
                ...bodyBuild
            }
        }
        const actualizarAnuncio = await putAnuncioService(req.params.id, datosAnuncio)
        res.json(actualizarAnuncio)
        if (!actualizarAnuncio.ok) return res.status(400)

        if (datosAnuncio.imgPath !== null) {
            fs.writeFileSync(urlPath, bufferComprimido)
        }

        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteAnuncio = async (req, res, next) => {
    try {
        const consultaAnuncio = await getAnuncioService(req.params.id)

        if (consultaAnuncio.ok) {
            if (deleteFile(consultaAnuncio.data.imgPath)) {
                next('El archivo no se eliminar')
            }
        }

        const deleteAnuncio = await deleteAnuncioService(req.params.id)

        res.json(deleteAnuncio)
        if (!deleteAnuncio.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
