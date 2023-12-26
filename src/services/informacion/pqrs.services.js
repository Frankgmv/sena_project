import Pqrs from "../../models/informacion/pqrs.js"

export function postPqrsService(pqrsData) {
    return new Promise(async (resolve, reject) => {
        try {
            const nuevoPqrs = await Pqrs.create(pqrsData)
            const pqrsCreado = await nuevoPqrs.save();
            resolve(pqrsCreado);
        } catch (err) {
            reject(err)
        }
    })
}

export function putPqrsService(idPqrs) {
    return new Promise(async (resolve, reject) => {
        try {
            const getPqrsAndUpdate = await Pqrs.findByPk(idPqrs);
            if (!getPqrsAndUpdate) resolve(0);
            const updated = await getPqrsAndUpdate.update({
                estado: true
            });
            resolve(updated);
        } catch (err) {
            reject(err)
        }
    })
}

export function getAllPqrsService() {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllPqrs = await Pqrs.findAll();
            resolve(getAllPqrs);
        } catch (err) {
            reject(err)
        }
    })
}

export function getPqrsService(idPqrs) {
    return new Promise(async (resolve, reject) => {
        try {
            const getPqrs = await Pqrs.findByPk(idPqrs);
            resolve(getPqrs);
        } catch (err) {
            reject(err)
        }
    })
}

export function deletePqrsService(idPqrs) {
    return new Promise(async (resolve, reject) => {
        try {
            const findPqrs = await Pqrs.findByPk(idPqrs)
            if (!findPqrs) resolve({
                message: "Registro no encontrado"
            })

            await findPqrs.destroy();
            resolve({
                status: "eliminado",
                ...findPqrs
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
            });

            if (EliminarPqrsSinLeer.length < 1) resolve(0);

            for (const pqrs of EliminarPqrsSinLeer) {
                await pqrs.destroy();
            }
            resolve(1);
        } catch (err) {
            reject(err)
        }
    })
}