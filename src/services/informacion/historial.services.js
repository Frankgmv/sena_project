import Usuario from '../../models/data/usuario.js'
import Historial from '../../models/informacion/historial.js'

export const postHistorialService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existeUsuario = await Usuario.findByPk(data.UsuarioId)

            if (!existeUsuario) {
 return resolve({
                ok:false,
                message:'El usuario no existe'
            })
}

            const generarRegistro = await Historial.create(data)
            const response = await generarRegistro.save()

            resolve({
                ok:true,
                message:'registro creado.',
                registro: response
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllHistorialService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const registros = await Historial.findAll()

            resolve({
                ok:true,
                message:'Historial Completo',
                historial: registros
            })
        } catch (error) {
            reject(error)
        }
    })
}
export const getHistorialService = (idHistorial) => {
    return new Promise(async (resolve, reject) => {
        try {
            const registro = await Historial.findByPk(idHistorial)

            if (!registro) {
 return resolve({
                ok:false,
                message:'Registro no encontrado'
            })
}

            resolve({
                ok:true,
                message:'Registro encontrado',
                Historial: registro
            })
        } catch (error) {
            reject(error)
        }
    })
}
export const deleteHistorialService = (idHistorial) => {
    return new Promise(async (resolve, reject) => {
        try {
            const eliminarHistorial = await Historial.findByPk(idHistorial)

            if (!eliminarHistorial) {
 return resolve({
                ok:false,
                message:'Registro no encontrado'
            })
}

            await eliminarHistorial.destroy()

            resolve({
                ok:true,
                message:'Registro eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

