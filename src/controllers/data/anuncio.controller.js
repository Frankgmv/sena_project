import fs from 'fs'
import sharp from 'sharp'
import {
    crearNombreImagenes
} from '../../helpers/includes.js'
import {
    validateSchemaInto
} from '../../middlewares/validarSchemas.js'
import {
    anuncioSchema
} from '../../schemas/dataSchemas.js'

import { getAllAnunciosService, getAnuncioService, postAnucioService } from '../../services/data/anuncio.services.js'

export const postAnuncio = async (req, res, next) => {
    // Inicializar variables globales
    let bodyBuild = {}
    const maxBytes = 1E7
    let datosAnuncio

    // Parsear Las Usuario y Seccion Id's del body
    try {
        const UsuarioId = parseInt(req.body.UsuarioId)
        const SeccionId = parseInt(req.body.SeccionId)
        bodyBuild = {
            ...req.body,
            UsuarioId,
            SeccionId
        }
    } catch (error) {
        next(error.message)
    }

    try {
        // validar la schema para los datos
        const validarSchemaResponse = validateSchemaInto(anuncioSchema, bodyBuild)

        // Retornar errores si hay en la validacion de la shema
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

            datosAnuncio = {...bodyBuild, imgPath: nombreArchivo.nombre}
        } else {
            // Montar anuncio sin imagen
            datosAnuncio = {...bodyBuild, imgPath: null}
        }
        // Guardar anuncio
        const guardar = await postAnucioService(datosAnuncio)
        res.json(guardar)
        if (!guardar.ok) return res.status(400)
        else res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllAnuncios = async (req, res, next) => {
    const { seccionKey } = req.query
    let seccionKeyRes = seccionKey || 'todos'

    try {
       const anuncios = await getAllAnunciosService(seccionKeyRes)
       if (!anuncios.ok) return res.status(404)
       res.status(200)
    } catch (error) {
        next(error)
    }
}

export const getAnuncio = async (req, res, next) => {
    try {
       const anuncio = await getAnuncioService(req.params.id)
       if (!anuncio.ok) return res.status(404)
       res.status(200)
    } catch (error) {
        next(error)
    }
}

