import Pqrs from '../../models/informacion/pqrs.js'

export function postPqrsService(pqrsData) {
    return new Promise(async (resolve, reject) => {
        try {
            const nuevoPqrs = await Pqrs.create(pqrsData)
            const pqrsCreado = await nuevoPqrs.save()
            resolve({
                ok: true,
                message: 'Pqrs registrado',
                pqrs: pqrsCreado
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function getAllPqrsService() {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllPqrs = await Pqrs.findAll()

            if (getAllPqrs.length === 0) {
 return resolve({
                ok: false,
                message: 'No hay Pqrs'
            })
}

            resolve({
                ok: true,
                message: 'Lista de Pqrs',
                pqrs: getAllPqrs
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function putPqrsService(idPqrs) {
    return new Promise(async (resolve, reject) => {
        try {
            const getPqrsAndUpdate = await Pqrs.findByPk(idPqrs)
            if (!getPqrsAndUpdate) {
 return resolve({
                ok: false,
                message: 'No se encontró ningún dato para actualizar'
            })
}

            const updated = await getPqrsAndUpdate.update({
                estado: true
            })
            resolve({
                ok: true,
                message: 'Actualizado correctamente',
                pqrs: updated
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function getPqrsService(idPqrs) {
    return new Promise(async (resolve, reject) => {
        try {
            const getPqrs = await Pqrs.findByPk(idPqrs)
            if (!getPqrs) {
 resolve({
                ok: false,
                message: 'No se encontró ningún dato'
            })
}            else {
 resolve({
                ok: true,
                message: 'Datos de Pqrs',
                pqrs: getPqrs
            })
}
        } catch (err) {
            reject(err)
        }
    })
}

export function deletePqrsService(idPqrs) {
    return new Promise(async (resolve, reject) => {
        try {
            const findPqrs = await Pqrs.findByPk(idPqrs)
            if (!findPqrs) {
 resolve({
                ok: false,
                message: 'pqrs no encontrado'
            })
}

            await findPqrs.destroy()
            resolve({
                ok: true,
                message: 'pqrs eliminado correctamente',
                pqrs: findPqrs
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function deleteAllPqrsService() {
    return new Promise(async (resolve, reject) => {
        try {
            const EliminarPqrsSinLeer = await Pqrs.findAll({
                where: {
                    estado: true
                }
            })

            if (EliminarPqrsSinLeer.length === 0) {
 resolve({
                ok: false,
                message: 'No hay Pqrs sin leer'
            })
}

            for (const pqrs of EliminarPqrsSinLeer) {
                await pqrs.destroy()
            }
            resolve({
                ok: true,
                message: 'los Pqrs leídos han sido Eliminados'
            })
        } catch (err) {
            reject(err)
        }
    })
}
