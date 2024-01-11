import Noticia from "../../models/data/noticia.js";
import Usuario from "../../models/data/usuario.js";

export const postNoticiaService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            const existeNoticia = await Noticia.findOne({
                where: {
                    titulo: data.titulo
                }
            });

            const existeUsuario = await Usuario.findOne({
                where: {
                    id: data.UsuarioId
                }
            });

            if (existeNoticia) return resolve({
                ok: false,
                message: "La noticia ya existe"
            })

            if (!existeUsuario) return resolve({
                ok: false,
                message: "El usuario no existe"
            })

            const crearNoticia = new Noticia(data);
            await crearNoticia.save();

            resolve({
                ok: true,
                message: "Noticia creada exitosamente.",
                noticia: crearNoticia
            })

        } catch (error) {
            reject(error);
        }
    })
}

export const getAllNoticiasService = (estado, pagina, num_noticias = 12) => {

    var consulta = {
        offset: (pagina - 1) * num_noticias,
        limit: +num_noticias
    };

    return new Promise(async (resolve, reject) => {
        try {
            if (estado !== "activas" && estado !== "inactivas" && estado !== "todas") {
                return resolve({
                    ok: false,
                    message: "estado inválido",
                    estados: ["activos", "inactivas", "todas"]
                });
            }
            if (estado !== "todas") {
                var where = {
                    estado: {
                        $eq: estado === "activas" ? true : false
                    }
                }
                where.estado = estado === "activas" ? true : false;
                consulta = {
                    ...consulta,
                    where
                };
            }
            const noticias = await Noticia.findAll(consulta);
            resolve({
                ok: true,
                total_usuarios: noticias.length,
                limite: num_noticias,
                estado,
                pagina,
                noticias
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getNoticiaService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let noticia = await Noticia.findByPk(id)

            if (!noticia) return resolve({
                ok: false,
                message: "Noticia no encontrada"
            })

            resolve({
                ok: true,
                message: "Noticia encontrada exitosamente.",
                noticia: noticia
            })

        } catch (error) {
            reject(error);
        }
    })
}

export const putNoticiaService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (data?.id) {
                delete data.id;
            }

            let noticia = await Noticia.findByPk(id)

            if (!noticia) return resolve({
                ok: false,
                message: "La noticia no existe"
            })

            const modificarNoticia = await noticia.update(data);
            await modificarNoticia.save();

            resolve({
                ok: true,
                message: "Noticia modificada exitosamente.",
                noticia: modificarNoticia
            })

        } catch (error) {
            reject(error);
        }
    })
}


export const deleteNoticiaService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let noticia = await Noticia.findByPk(id)
            if (!noticia) return resolve({
                ok: false,
                message: "Noticia no encontrada"
            })
            await noticia.destroy();
            resolve({
                ok: true,
                message: `Noticia ${noticia.titulo}  eliminada exitosamente`
            })
        } catch (error) {
            reject(error);
        }
    })
}