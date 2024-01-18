import Anuncio from '../../models/data/anuncio.js'
import Seccion from '../../models/data/seccion.js'
import Usuario from '../../models/data/usuario.js'
import 'colors'

export const postAnucioService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existeTitulo = await Anuncio.findAll({
                where: {
                    titulo: data.titulo
                }
            })
            if (existeTitulo.length > 0) {
                return resolve({
                    ok: false,
                    message: 'Titulo anuncio existente.'
                })
            }

            const existeUsuario = await Usuario.findOne({
                where: {
                    id: data.UsuarioId
                }
            })

            if (!existeUsuario) {
                return resolve({
                    ok: false,
                    message: 'UsuarioId no existe'
                })
            }

            const existeSeccion = await Seccion.findOne({
                where: {
                    id: data.SeccionId
                }
            })

            if (!existeSeccion) {
                return resolve({
                    ok: false,
                    message: 'SeccionId no existe'
                })
            }

            const crearAnuncio = await Anuncio.create(data)
            console.log(JSON.stringify(data).yellow)
            const response = await crearAnuncio.save()
            return resolve({
                ok: true,
                message: 'Anuncio creado.',
                anuncio: response
            })
        } catch (error) {
            reject(error)
        }
    })
}
