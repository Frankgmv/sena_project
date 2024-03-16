import fs from 'fs'
import sharp from 'sharp'
import {
    crearNombreRecurso,
    deleteFile
} from '../../helpers/includes.js'
import {
    validateSchemaInto
} from '../../middlewares/validarSchemas.js'
import {
    putVideoSchema,
    videoSchema
} from '../../schemas/MultimediaSchemas.js'
import {
    maxBytes,
    tiposPermitidos
} from '../../variables.js'
import {
    deleteVideoService,
    getAllVideoService,
    getVideoService,
    postVideoService,
    putVideoService
} from '../../services/multimedia/video.services.js'

export const postVideo = async (req, res, next) => {
    try {
        let bodyBuild = {}
        let datosVideo
        const UsuarioId = parseInt(req.body.UsuarioId)
        bodyBuild = {
            ...req.body,
            UsuarioId
        }

        let bufferComprimido
        let urlPath
        const validarSchemaResponse = validateSchemaInto(videoSchema, bodyBuild)
        if (validarSchemaResponse.issues) {
            return res.status(400).json({
                error: true,
                zodError: validarSchemaResponse
            })
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

            datosVideo = {
                ...bodyBuild,
                imgPath: nombreArchivo.nombre
            }
        } else {
            return res.status(400).json({
                ok: false,
                message: 'la imagen es requerida'
            })
        }

        const guardarVideo = await postVideoService(datosVideo)
        res.json(guardarVideo)
        if (!guardarVideo.ok) return res.status(400)

        if (datosVideo.imgPath) {
            fs.writeFileSync(urlPath, bufferComprimido)
        }

        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllVideo = async (req, res, next) => {
    try {
        const videos = await getAllVideoService()
        res.json(videos).status(200)
    } catch (error) {
        next(error)
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await getVideoService(req.params.id)
        res.json(video)
        if (!video.ok) return res.status(400)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const putVideo = async (req, res, next) => {
    try {
        let bufferComprimido
        let urlPath
        let bodyBuild = {
            ...req.body
        }
        if (bodyBuild.UsuarioId) {
            bodyBuild = {
                ...bodyBuild,
                UsuarioId: parseInt(bodyBuild.UsuarioId)
            }
        }
        let datosVideo

        const validarSchemaResponse = validateSchemaInto(putVideoSchema, bodyBuild)
        if (validarSchemaResponse.issues) {
            return res.status(400).json({
                error: true,
                zodError: validarSchemaResponse
            })
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

            datosVideo = {
                ...bodyBuild,
                imgPath: nombreArchivo.nombre
            }

            const consultaVideo = await getVideoService(req.params.id)
            if (consultaVideo.ok) {
                if (consultaVideo.data.imgPath) {
                    if (deleteFile(consultaVideo.data.imgPath)) {
                        next('error al remplazar el archivo')
                    }
                }
            }
        } else {
            datosVideo = {
                ...bodyBuild
            }
        }
        const actualizarVideo = await putVideoService(req.params.id, datosVideo)
        res.json(actualizarVideo)
        if (!actualizarVideo.ok) return res.status(400)

        if (datosVideo.imgPath) {
            fs.writeFileSync(urlPath, bufferComprimido)
        }
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const consultaVideo = await getVideoService(req.params.id)

        if (consultaVideo.ok) {
            if (deleteFile(consultaVideo.data.imgPath)) {
                next('error al eliminar el archivo')
            }
        }

        const EliminarVideo = await deleteVideoService(req.params.id)
        res.json(EliminarVideo)
        if (!EliminarVideo.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
