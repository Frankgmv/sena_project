import {
    validateSchemaInto
} from '../../middlewares/validarSchemas.js'
import {
    anuncioSchema
} from '../../schemas/dataSchemas.js'
import 'colors'
import sharp from 'sharp'
import fs from 'fs'
import {
    crearNombreImagenes
} from '../../helpers/includes.js'

export const postAnuncio = async (req, res, next) => {
    // Inicializar variables globales
    let bodyBuild = {}
    const maxBytes = 1E7

    // Parsear Las Usuario y Seccion Id's
    try {
        const UsuarioId = parseInt(req.body.UsuarioId)
        const SeccionId = parseInt(req.body.SeccionId)
        bodyBuild = {
            ...req.body,
            UsuarioId,
            SeccionId
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al parsear SesionId o UsuarioId'
        })
    }

    try {
        // validar la schema para los datos
        const validarSchemaResponse = validateSchemaInto(anuncioSchema, bodyBuild)

        // Retornar errores si hay en la validacion de la shema
        if (validarSchemaResponse.issues) return res.status(400).json(validarSchemaResponse)

        let image = req.file
        console.log(image)
        if (image) {
            const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']

            // Validar tipos permitodos
            if (!tiposPermitidos.includes(image.mimetype)) {
                return res.status(400).json({
                    ok: false,
                    message: 'Formato inválido. [png, jpg, jpeg, gif]'
                })
            }

            // Validar tamaña archivo
            if (image.size > maxBytes) {
                return res.status(400).json({
                    message: 'La imagen es muy grande. (10MB máx)'
                })
            }

            // Acciones o proceso para montar el anuncio

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

            const crearPath = `src/upload/${nombreArchivo.nombre}`
            fs.writeFileSync(crearPath, bufferComprimido)

            res.send('Archivo subido correctamente')
        } else {
            // Montar anuncio sin imagen

            res.status(200).json({
                message: 'no hay imagen'
            })
        }
    } catch (error) {
        next(error)
    }
}
