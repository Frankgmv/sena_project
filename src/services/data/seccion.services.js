import Seccion from "../../models/data/seccion.js";

export const getAllSessionesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const secciones = await Seccion.findAll();

            if(secciones.length === 0) return resolve({
                ok: false,
                message: "No hay secciones registradas",
                accionRecomendada:"Por favor agregue las secciones por defecto",
                secciones: secciones
            })

            resolve({
                ok: true,
                message: "Secciones obtenidas",
                secciones: secciones
            })
        } catch (error) {
            reject(error);
        }
    })
}

export const getSessionService = (idSeccion) => {
    return new Promise(async (resolve, reject) => {
        try {
            const seccion = await Seccion.findByPk(idSeccion);

            if(!seccion) return resolve({
                ok: false,
                message: "No se encontro la seccion"
            })

            resolve({
                ok: true,
                message: "Seccion obtenida",
                seccion: seccion
            })
        } catch (error) {
            reject(error);
        }
    })
}