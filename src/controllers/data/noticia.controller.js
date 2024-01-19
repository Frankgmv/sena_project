import sharp from 'sharp'
import fs from 'fs'
import * as path from 'path'
import {
    crearNombreImagenes
} from '../../helpers/includes.js'
import {
    validateSchemaInto
} from '../../middlewares/validarSchemas.js'
import {
    noticiaShema,
    putNoticiaShema
} from '../../schemas/dataSchemas.js'
import {
    deleteNoticiaService,
    getAllNoticiasService,
    getNoticiaService,
    postNoticiaService,
    putNoticiaService
} from '../../services/data/noticia.services.js'
import 'colors'

export const postNoticia = async (req, res, next) => {
    let bodyBuild = {}
    const maxBytes = 1E7
    let datosNoticia
    try {
        const UsuarioId = parseInt(req.body.UsuarioId)
        bodyBuild = {
            ...req.body,
            UsuarioId
        }
    } catch (error) {
        next(error)
    }

    try {
        // validar la schema para los datos
        const validarSchemaResponse = validateSchemaInto(noticiaShema, bodyBuild)
        if (validarSchemaResponse.issues) return res.status(400).json(validarSchemaResponse)

        let image = req.file
        if (image) {
            // Montar anuncio con imagen
            const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg']

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

            // Utilizamos un formato de compresión de imágenes sin pérdidas
            const buffer = Buffer.from(image.buffer, 'binary')

            const nombreArchivo = crearNombreImagenes(image)
            let proccesImage = sharp(buffer)

            const ancho = proccesImage.width
            const alto = proccesImage.height

            if (ancho > 1024 || alto > 1024) {
                const escala = Math.min(1, 1024 / ancho, 1024 / alto)
                proccesImage = proccesImage.scale(escala)
            }

            // Guardamos la imagen comprimida
            const bufferComprimido = await proccesImage.toBuffer(nombreArchivo.mimetype)

            const urlPath = `src/upload/${nombreArchivo.nombre}`
            fs.writeFileSync(urlPath, bufferComprimido)

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
        res.status(200)
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
        const limiteNoticia = parseInt(limite || 12)

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
        let bodyBuild = {
            ...req.body
        }
        const maxBytes = 1E7
        if (req.body.UsuarioId) {
            const UsuarioId = parseInt(req.body.UsuarioId)
            bodyBuild = {
                ...bodyBuild,
                UsuarioId
            }
        }
        let datosNoticia

        const validarSchemaResponse = validateSchemaInto(putNoticiaShema, bodyBuild)
        if (validarSchemaResponse.issues) return res.status(400).json(validarSchemaResponse)

        let image = req.file
        if (image) {
            const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg']

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

            const nombreArchivo = crearNombreImagenes(image)
            let proccesImage = sharp(buffer)

            const ancho = proccesImage.width
            const alto = proccesImage.height

            if (ancho > 1024 || alto > 1024) {
                const escala = Math.min(1, 1024 / ancho, 1024 / alto)
                proccesImage = proccesImage.scale(escala)
            }

            const bufferComprimido = await proccesImage.toBuffer(nombreArchivo.mimetype)

            const urlPath = `src/upload/${nombreArchivo.nombre}`
            fs.writeFileSync(urlPath, bufferComprimido)

            datosNoticia = {
                ...bodyBuild,
                imgPath: nombreArchivo.nombre
            }

            const consultaNoticia = await getNoticiaService(req.params.id)

            if (consultaNoticia.ok) {
                let pathAntiguio = `src/upload/${consultaNoticia.noticia.imgPath}`
                const existe = fs.existsSync(pathAntiguio)

                if (pathAntiguio && existe) {
                    fs.rm(pathAntiguio, (err) => {
                        if (err) return next('error al remplazar el archivo')
                    })
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
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteNoticia = async (req, res, next) => {
    try {
        const EliminarNoticias = await deleteNoticiaService(req.params.id)
        res.json(EliminarNoticias)
        if (!EliminarNoticias.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
