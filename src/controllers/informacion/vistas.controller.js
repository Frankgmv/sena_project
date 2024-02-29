import { deleteVistasService, getVistasService, postVistasService, putVistasService
} from '../../services/informacion/vistas.services.js'

export const postVistas = async (req, res, next) => {
    try {
        const defaultVistas = {
            'vistasTotales':1,
            'vistasMes':1,
            'vistasDia':1
        }

        const crearVista = await postVistasService(defaultVistas)

        if (crearVista.ok) {
            res.status(201).json(crearVista)
        } else {
            const updateVista = await putVistasService()

            res.json(updateVista)
            if (!updateVista.ok) return res.status(400)
            res.status(200)
        }
    } catch (err) {
        next(err)
    }
}

export const getVistas = async (req, res, next) => {
    try {
        const obtenerVista = await getVistasService()
        res.json(obtenerVista)
        if (!obtenerVista.ok) return res.status(404)
        res.status(200)
    } catch (err) {
        next(err)
    }
}

export const deleteVistas = async (req, res, next) => {
    try {
        const eliminar = await deleteVistasService()
        res.json(eliminar)
        if (!eliminar.ok) return res.status(404)
        res.status(200)
    } catch (err) {
        next(err)
    }
}
