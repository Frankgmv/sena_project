import { deleteVistasService, getVistasService, postVistasService, putVistasService } from "../../services/informacion/vistas.services.js";

export const postVistas = async (req, res, next) => {
    try {
        const defaultVistas = {
            "vistasTotales":1,
            "vistasMes":1,
            "vistasDia":1
        }
        const crearVista = await postVistasService(defaultVistas);

        if(crearVista){
            res.status(201).json(crearVista)
        }else{

            const updateVista = await putVistasService();
            res.status(200).json(updateVista)
        }

    } catch (err) {
        next(err);
    }
}



export const getVistas = async (req, res, next) => {
    try {
        const obtenerVista = await getVistasService();
        res.status(201).json(obtenerVista)
    } catch (err) {
        next(err);
    }
}
export const deleteVistas = async (req, res, next) => {
    try {
        const eliminar = await deleteVistasService();
        res.status(201).json(eliminar)
    } catch (err) {
        next(err);
    }
}
