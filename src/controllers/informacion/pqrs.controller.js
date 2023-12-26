import {
    deleteAllPqrsService,
    deletePqrsService,
    getAllPqrsService,
    getPqrsService,
    postPqrsService,
    putPqrsService
} from "../../services/informacion/pqrs.services.js"


export const postPqrs = async (req, res, next) => {
    try {
        const pqrsCreado = await postPqrsService(req.body);
        return res.status(201).json(pqrsCreado)
    } catch (err) {
        next(err);
    }
}

export const getPqrs = async (req, res, next) => {
    try {
        const pqrsResponse = await getPqrsService(req.params.id)
        if (!pqrsResponse) {
            return res.status(400).json({
                message: "No se encontró ningun dato"
            })
        }
        return res.status(200).json(pqrsResponse)
    } catch (err) {
        next(err);
    }
}

export const getAllPqrs = async (req, res, next) => {
    try {
        const allPqrsResponse = await getAllPqrsService();
        return res.status(200).json(allPqrsResponse)
    } catch (err) {
        next(err);
    }
}

export const putPqrs = async (req, res, next) => {
    try {
        const allPqrsResponse = await putPqrsService(req.params.id);
        if (!allPqrsResponse) {
            return res.status(400).json({
                message: "No se encontró ningun dato para actualizar"
            })
        }
        return res.status(200).json(allPqrsResponse)
    } catch (err) {
        next(err);
    }
}

export const deletePqrs = async (req, res, next) => {
    try {
        const deletePqrsResponse = await deletePqrsService(req.params.id);
        if (!deletePqrsResponse) res.status(200).json(deletePqrs)
        else res.status(400).json(deletePqrsResponse);
    } catch (err) {
        next(err);
    }
}

export const deleteAllPqrs = async (req, res, next) => {
    try {
        const deleteAllPqrs = await deleteAllPqrsService();
        if (deleteAllPqrs) res.status(200).json({
            message: "Pqrs's leídos Elimindos exitosamente"
        })
        else res.status(200).json({
            message: "no hay pqrs leídos"
        });
    } catch (err) {
        next(err);
    }
}