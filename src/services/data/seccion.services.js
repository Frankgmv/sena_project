import Seccion from '../../models/data/seccion.js'

export const getAllSessionesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const secciones = await Seccion.findAll()

            resolve({
                ok: true,
                message: 'Secciones obtenidas',
                data: secciones
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getSessionService = (idSeccion) => {
    return new Promise(async (resolve, reject) => {
        try {
            const seccion = await Seccion.findByPk(idSeccion)

            if (!seccion) {
                return resolve({
                    ok: false,
                    message: 'Seccion no encontrada'
                })
            }

            resolve({
                ok: true,
                message: 'Seccion obtenida',
                data: seccion
            })
        } catch (error) {
            reject(error)
        }
    })
}
