import Notificaciones from "../../models/informacion/notificaciones.js";

export const postNotificacionService = (notificacionData) => {
    return new Promise(async (resolve, reject) => {
        try {

            const existe = await Notificaciones.findOne({
                where: {
                    titulo: notificacionData.titulo
                }
            })

            if (existe) {
                resolve({
                    message_status: `${notificacionData.titulo} ya existe`
                })
            } else {
                const notiCreada = await Notificaciones.create(notificacionData)
                const notiGuardada = await notiCreada.save();
                resolve(notiGuardada)
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const getNotificionesService = (idNoti) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findNoti = await Notificaciones.findByPk(idNoti)

            if (!findNoti) return resolve({
                message: "No se encontró"
            })

            resolve(findNoti)
        } catch (err) {
            reject(err)
        }
    })
}
export const getAllNotificionesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const notis = await Notificaciones.findAll({
                orderBy:["id"]
            });
            if (notis.length === 0) resolve({message:"No hay notificaciones"})
            resolve(notis)
        } catch (err) {
            reject(err)
        }
    })
}

export const putNotificacionService = (idNoti) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findNoti = await Notificaciones.findByPk(idNoti)
            if (!findNoti) resolve(0);

            const updated = await findNoti.update({
                estado: true
            });
            resolve(updated)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteNotificacionService = (idNoti) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findNotificaciones = await Notificaciones.findByPk(idNoti)
            if (!findNotificaciones) resolve({
                message: "Registro no encontrado"
            })

            await findNotificaciones.destroy();
            resolve({
                status: "eliminado",
                ...findNotificaciones
            })
        } catch (err) {
            reject(err)
        }
    })
}


export function deleteAllNotificacionesService() {
    return new Promise(async (resolve, reject) => {
        try {
            const EliminarNotificacionesSinLeer = await Notificaciones.findAll({
                where: {
                    estado: true
                }
            });

            if (EliminarNotificacionesSinLeer.length < 1) resolve(0);

            for (const notif of EliminarNotificacionesSinLeer) {
                await notif.destroy();
            }
            resolve(1);
        } catch (err) {
            reject(err)
        }
    })
}