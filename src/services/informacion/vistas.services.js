import Vistas from "../../models/informacion/vistas.js";
import "colors"
export const postVistasService = (Vistadata) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obtenerVisualizacion = await Vistas.findAll();

            if (obtenerVisualizacion.length !== 0) {
                resolve(0)
            } else {
                const createVistas = await Vistas.create(Vistadata);
                await createVistas.save();
                resolve(createVistas);
            }
        } catch (err) {
            reject(err)
        }
    });
}

export const getVistasService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const obtenerVisualizacion = await Vistas.findAll({
                order: ["id"]
            });
            resolve(obtenerVisualizacion);
        } catch (err) {
            reject(err)
        }
    });
}

export const putVistasService = () => {

    // ! hacer una de reinicio para el día y el mes
    // TODO const fecha = new Date();
    // const fechaReinicio = new Date();
    // fechaReinicio.setHours(1, 0, 0, 0);

    return new Promise(async (resolve, reject) => {
        try {
            let obtenerVisualizacion = await Vistas.findAll();

            obtenerVisualizacion = obtenerVisualizacion[0].dataValues;
            const dataVisual = await Vistas.findByPk(obtenerVisualizacion.id);

            const dataUpdate = {
                "vistasTotales": dataVisual["vistasTotales"] + 1,
                "vistasMes": dataVisual["vistasMes"] + 1,
                "vistasDia": dataVisual["vistasDia"] + 1
            }

            await dataVisual.update(dataUpdate);

            resolve(dataVisual)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteVistasService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let obtenerVisualizacion = await Vistas.findAll();

            for (let vista of obtenerVisualizacion) {
                await vista.destroy();
            }
            resolve({
                message: "Vistas eliminadas"
            })
        } catch (error) {
            reject(error)
        }
    })
}