import fs from 'fs'
import { crearNombreRecurso, deleteFile } from '../../helpers/includes.js'
import { validateSchemaInto } from '../../middlewares/validarSchemas.js'
import { archivoSchema } from '../../schemas/MultimediaSchemas.js'
import { ArchivosPermitidos, archiveMaxBytes } from '../../variables.js'
import { deleteArchivoService, getArchivoService, postArchivoService } from '../../services/multimedia/archivo.services.js'

export const postArchivo = async (req, res, next) => {
    try {
        let urlPath
        let pdfBuffer
        let nombreArchivo
        let datosArchivo
        let bodyBuild = {
            ...req.body
        }

        if (bodyBuild.UsuarioId) {
            bodyBuild = {
                ...bodyBuild,
                UsuarioId: parseInt(bodyBuild.UsuarioId)
            }
        }

        const validarBody = validateSchemaInto(archivoSchema, bodyBuild)
        if (validarBody.issues) {
            return res.status(400).json({error:true, zodError:validarBody})
        }

        let archivo = req.file
        if (archivo) {
            if (!ArchivosPermitidos.includes(archivo.mimetype)) {
                return res.status(400).json({
                    ok: false,
                    message: `Formato ${archivo.mimetype.split('/'[1])} inválido. [pdf]`
                })
            }

            if (archivo.size > archiveMaxBytes) {
                return res.status(400).json({
                    message: 'El archivo es muy pesado. (40MB MÁX)'
                })
            }

            nombreArchivo = crearNombreRecurso(archivo)

            urlPath = `var/data/${nombreArchivo.nombre}`

            pdfBuffer = await Buffer.from(archivo.buffer)

            datosArchivo = {
                ...bodyBuild,
                archivo: nombreArchivo.nombre
            }
        } else {
            return res.status(400).json({
                message: 'El archivo requerido'
            })
        }
        const guardarArchivo = await postArchivoService(datosArchivo)

        res.json(guardarArchivo)
        if (!guardarArchivo.ok) return res.status(400)

        if (datosArchivo.archivo) {
            fs.writeFileSync(urlPath, pdfBuffer)
        }
        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getArchivo = async (req, res, next) => {
    try {
        const archivo = await getArchivoService()

        res.json(archivo)
        if (!archivo.ok) return res.status(400)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteArchivo = async (req, res, next) => {
    try {
        const getArchivo = await getArchivoService()

        if (getArchivo.ok) {
            if (deleteFile(getArchivo.data.archivo)) {
                next('error al eliminar el archivo')
            }
        }

        const deleteArchivo = await deleteArchivoService()
        res.json(deleteArchivo)
        if (!deleteArchivo.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
