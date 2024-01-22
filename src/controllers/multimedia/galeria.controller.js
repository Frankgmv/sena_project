import fs from 'fs'
import sharp from 'sharp'
import {
  crearNombreImagenes,
  deleteFile
} from '../../helpers/includes.js'
import {
  validateSchemaInto
} from '../../middlewares/validarSchemas.js'
import {
  galeriaSchema,
  putGaleriaSchema
} from '../../schemas/MultimediaSchemas.js'
import {
  tiposPermitidos,
  maxBytes
} from '../../variables.js'

import {
  postGaleriaService,
  getAllGaleriaService,
  getGaleriaService,
  putGaleriaService,
  deleteGaleriaService
} from '../../services/multimedia/galeria.services.js'
import 'colors'

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
    if (validarBody.issues) return res.status(400).json(validarBody)

    let image = req.file
    if (image) {
      if (!tiposPermitidos.includes(image.mimetype)) {
        return res.status(400).json({
          ok: false,
          message: `Formato ${image.mimetype.split('/')[1]} inválido. [pmg, jpg, jpeg]`
        })
      }

      if (image.size > maxBytes) {
        return res.status(400).json({
          message: 'La imagen es muy grande. (Máx 10MB)'
        })
      }

      const buffer = Buffer.from(image.buffer, 'binary')

      const nombreImagen = crearNombreImagenes(image)
      let proccesImage = sharp(buffer)

      const ancho = proccesImage.width
      const alto = proccesImage.height

      if (ancho > 1024 || alto > 1024) {
        const escala = Math.min(1, 1024 / ancho, 1024 / alto)
        proccesImage = proccesImage.grayscale(escala)
      }

      bufferComprimido = await proccesImage.toBuffer(nombreImagen.mimetype)

      urlPath = `src/upload/${nombreImagen.nombre}`
      datosGaleria = {
        ...bodyBuild,
        imgPath: nombreImagen.nombre
      }
    } else {
      datosGaleria = {
        ...bodyBuild,
        imgPath: null
      }
    }

    const crearGaleria = await postGaleriaService(datosGaleria)

    res.json(crearGaleria)
    if (!crearGaleria.ok) return res.status(400)

    fs.writeFileSync(urlPath, bufferComprimido)
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
    if (validarSchemaResponse.issues) return res.status(400).json(validarSchemaResponse)

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

      const nombreArchivo = crearNombreImagenes(image)
      let processImage = sharp(buffer)

      const ancho = processImage.with
      const alto = processImage.height

      if (ancho > 1024 || alto > 1024) {
        const escala = Math.min(1, 1024 / ancho, 1024 / alto)
        processImage = processImage.scale(escala)
      }

      bufferComprimido = await processImage.toBuffer(nombreArchivo.mimetype)
      urlPath = `src/upload/${nombreArchivo.nombre}`

      datosImagen = {
        ...bodyBuild,
        imgPath: nombreArchivo.nombre
      }

      const consultaAnuncio = await getGaleriaService(req.params.id)
      if (consultaAnuncio.ok) {
        if (deleteFile(consultaAnuncio.imagen.imgPath)) {
          next('error al remplazar el archivo')
        }
      }
    } else {
      datosImagen = {
        ...bodyBuild,
        imgPath: null
      }
    }
    const actualizarImagen = await putGaleriaService(req.params.id, datosImagen)
    res.json(actualizarImagen)
    if (!actualizarImagen.ok) return res.status(400)

    fs.writeFileSync(urlPath, bufferComprimido)
    res.status(200)
  } catch (error) {
    next(error)
  }
}

export const deleteGaleria = async (req, res, next) => {
  try {
    const consultaImagen = await getGaleriaService(req.params.id)

    if (consultaImagen.ok) {
      if (deleteFile(consultaImagen.imagen.imgPath)) {
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
