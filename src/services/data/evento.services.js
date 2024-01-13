import Evento from "../../models/data/evento.js";

export const postEventoService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existeEvento = await Evento.findOne({
                where: {
                    evento: data.evento
                }
            })
            if (existeEvento) return resolve({
                ok: false,
                message: "Evento ya existe."
            })

            const nuevoEvento = await Evento.create(data);

            const guardar = await nuevoEvento.save();

            resolve({
                ok: true,
                message: "Evento creado.",
                evento: guardar
            })

        } catch (error) {
            reject(error);
        }
    })
}

export const getAllEventosService = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const eventos = await Evento.findAll();

            resolve({
                ok: true,
                message: "Todos los eventos",
                evento: eventos
            })

        } catch (error) {
            reject(error);
        }
    })
}

export const getEventoService = (idEvento) => {
    return new Promise(async (resolve, reject) => {
        try {

            const evento = await Evento.findByPk(idEvento);

            if (!evento) return resolve({
                ok: false,
                message: "Evento no existe"
            })

            resolve({
                ok: true,
                message: "eventos encontrado.",
                evento: evento
            })

        } catch (error) {
            reject(error);
        }
    })
}

export const putEventoService = (idEvento, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const evento = await Evento.findByPk(idEvento);
            if (!evento) return resolve({
                ok: false,
                message: "Evento no existe"
            })

            if(data.id){
                delete data.id;
            }

            const eventoActualizado = await evento.update(data);
            await eventoActualizado.save()

            resolve({
                ok: true,
                message: "Evento actualizado",
                evento: eventoActualizado
            })

        } catch (error) {
            reject(error);
        }
    })
}

export const deleteEventoService = (idEvento) => {
    return new Promise(async (resolve, reject) => {
        try {
            const eventoEncontrado = await Evento.findByPk(idEvento);
            if (!eventoEncontrado) return resolve({
                ok: false,
                message: "Evento no existe"
            })

            await eventoEncontrado.destroy();

            resolve({
                ok: true,
                message: "Evento Eliminado exitosamente"
            })

        } catch (error) {
            reject(error);
        }
    })
}






