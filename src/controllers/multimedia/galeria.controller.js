import fs from 'fs'
import sharp from 'sharp'
import { crearNombreRecurso, deleteFile } from '../../helpers/includes.js'
import { validateSchemaInto } from '../../middlewares/validarSchemas.js'
import { galeriaSchema, putGaleriaSchema } from '../../schemas/MultimediaSchemas.js'
import { tiposPermitidos, maxBytes } from '../../variables.js'
import { postGaleriaService, getAllGaleriaService, getGaleriaService, putGaleriaService, deleteGaleriaService
} from '../../services/multimedia/galeria.services.js'

export const postGaleria = async (req, res, next) => {
  try {
    let bufferComprimido
    let urlPath
    let datosGaleria
    let bodyBuild = {
      ...req.body
    }

    if (bodyBuild.UsuarioId) {
      bodyBuild = {
        ...bodyBuild,
        UsuarioId: parseInt(bodyBuild.UsuarioId)
      }
    }

    if (bodyBuild.EventoId) {
      bodyBuild = {
        ...bodyBuild,
        EventoId: parseInt(bodyBuild.EventoId)
      }
    }

    const validarBody = validateSchemaInto(galeriaSchema, bodyBuild)
    if (validarBody.issues) {
      return res.status(400).json({error:true, zodError: validarBody})
    }

    let image = req.file
    if (image) {
      // validar tipo de dato
      if (!tiposPermitidos.includes(image.mimetype)) {
        return res.status(400).json({
          ok: false,
          message: `Formato ${image.mimetype.split('/')[1]} inválido. [png, jpg, jpeg]`
        })
      }

      // Peso de la imagen
      if (image.size > maxBytes) {
        return res.status(400).json({
          message: 'La imagen es muy grande. (Máx 10MB)'
        })
      }

      // Asignar buffer o datos de la imagen
      const buffer = Buffer.from(image.buffer, 'binary')

      const nombreImagen = crearNombreRecurso(image)

      // intanciar imagen para manipularla mejor
      let proccesImage = sharp(buffer)

      const ancho = proccesImage.width
      const alto = proccesImage.height

      // redimencionar imagen
      if (ancho > 1024 || alto > 1024) {
        const escala = Math.min(1, 1024 / ancho, 1024 / alto)
        proccesImage = proccesImage.grayscale(escala)
      }

      // Buffer con datos de imagen ya procesados.
      bufferComprimido = await proccesImage.toBuffer(nombreImagen.mimetype)

      // url para guardar imagenes
      urlPath = `var/data/${nombreImagen.nombre}`
      datosGaleria = {
        ...bodyBuild,
        imgPath: nombreImagen.nombre
      }
    } else {
      return res.status(400).json({
        ok:false,
        message:'la imagen es requerida'
      })
    }

    const crearGaleria = await postGaleriaService(datosGaleria)

    res.json(crearGaleria)
    if (!crearGaleria.ok) return res.status(400)

    if (datosGaleria.imgPath) {
      // Crear imagen en la carpeta.
      fs.writeFileSync(urlPath, bufferComprimido)
    }
    res.status(201)
  } catch (error) {
    next(error)
  }
}

export const getAllGaleria = async (req, res, next) => {
  try {
    const imagenes = await getAllGaleriaService()
    res.json(imagenes)
    if (!imagenes.ok) return res.status(400)
    res.status(200)
  } catch (error) {
    next(error)
  }
}

export const getGaleria = async (req, res, next) => {
  try {
    const imagen = await getGaleriaService(req.params.id)
    res.json(imagen)
    if (!imagen.ok) return res.status(400)
    res.status(200)
  } catch (error) {
    next(error)
  }
}

export const putGaleria = async (req, res, next) => {
  try {
    let bufferComprimido
    let urlPath
    let datosImagen

    let bodyBuild = {
      ...req.body
    }

    if (bodyBuild.UsuarioId) {
      bodyBuild = {
        ...bodyBuild,
        UsuarioId: parseInt(bodyBuild.UsuarioId)
      }
    }

    if (bodyBuild.EventoId) {
      bodyBuild = {
        ...bodyBuild,
        EventoId: parseInt(bodyBuild.EventoId)
      }
    }

    const validarSchemaResponse = validateSchemaInto(putGaleriaSchema, bodyBuild)
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

      datosImagen = {
        ...bodyBuild,
        imgPath: nombreArchivo.nombre
      }

      // Consultar imagen antigua.
      const consultaAnuncio = await getGaleriaService(req.params.id)

      if (consultaAnuncio.ok) {
        // eliminar archivo antiguo
        if (deleteFile(consultaAnuncio.data.imgPath)) {
          next('error al remplazar el archivo')
        }
      }
    } else {
      datosImagen = {
        ...bodyBuild
      }
    }
    // Modificar archivo en base de datos
    const actualizarImagen = await putGaleriaService(req.params.id, datosImagen)
    res.json(actualizarImagen)
    if (!actualizarImagen.ok) return res.status(400)

    if (datosImagen.imgPath) {
      // Crear imagen nuevamente en la carpeta
      fs.writeFileSync(urlPath, bufferComprimido)
    }

    res.status(200)
  } catch (error) {
    next(error)
  }
}

export const deleteGaleria = async (req, res, next) => {
  try {
    const consultaImagen = await getGaleriaService(req.params.id)

    if (consultaImagen.ok) {
      if (deleteFile(consultaImagen.data.imgPath)) {
        next('El archivo no se eliminar')
      }
    }

    const deleteImagen = await deleteGaleriaService(req.params.id)

    res.json(deleteImagen)
    if (!deleteImagen.ok) return res.status(404)
    res.status(200)
  } catch (error) {
    next(error)
  }
}
