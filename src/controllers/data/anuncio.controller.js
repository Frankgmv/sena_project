// import { postAnucioService } from '../../services/data/anuncio.services.js'
import {
    validateSchemaInto
} from '../../middlewares/validarSchemas.js'
import {
    anuncioSchema
} from '../../schemas/dataSchemas.js'
import 'colors'

export const postAnuncio = async (req, res, next) => {
    // Inicializar variables globales
    let bodyBuild = {}
    let file = {}
    const maxBytes = 1024 * 1024 * 10

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
        res.status(400).json('Error al parsear SesionId o UsuarioId')
    }

    try {
        // validar la schema para los datos
        const validarSchemaResponse = validateSchemaInto(anuncioSchema, bodyBuild)

        // Retornar errores si hay
        if (validarSchemaResponse.issues) return res.status(400).json(validarSchemaResponse)

        // Validar las imagenes
        file = req.file
        if (file) {
            // Validar el tamaño de las imagenes
            res.status(200).json({
                file: {
                    ...req.file
                },
                body: {
                    ...bodyBuild
                }
            })
            if (file.mimetype !== 'image/png' || file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/jpg') {
                return res.status(400).json({
                    message: 'La imagen es muy grande. (10MB máx)'
                })
            } else if (file.size > maxBytes) {
                return res.status(400).json({
                    message: 'La imagen es muy grande. (10MB máx)'
                })
            } else {
                res.send('Archivo subido correctamente')
            }
        }

        // const crearAnuncio = await postAnucioService(req.body);
        // res.json(crearAnuncio);
        // if(!crearAnuncio.ok) return res.status(400);
        // res.status(201);
    } catch (error) {
        next(error)
    }
}
