import Anuncio from '../../models/data/anuncio.js'

export const postAnucioService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existeTitulo = await Anuncio.findAll({ where:{ titulo: data.titulo } })
            if (existeTitulo.length > 0) {
                resolve({
                    ok:false,
                    message:'Anuncio existente.'
                })
            }

            const crearAnuncio = await Anuncio.create(data)
            const response = await crearAnuncio.save()
            resolve({
                ok:true,
                message:'Anuncio creado.',
                anuncio:response
            })
        } catch (error) {
            reject(error)
        }
    })
}
/*
export const getAllLinksService = (tipo) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (tipo !== "pdf" && tipo !== "blog" && tipo !== "todos") {
                return resolve({
                    ok: false,
                    message: "tipo inválido",
                    estados: ["pdf", "blog", "todos"]
                });
            }
            let consulta = {};
            if (tipo !== "todos") {

                var where = {
                    tipo: tipo === "blog" ? "blog" : "pdf"
                }

                consulta = {
                    where
                };
            }
            const links = await Link.findAll(consulta);
            resolve({
                ok: true,
                total_link: links.length,
                links
            })

        } catch (error) {
            reject(error)
        }
    })
}

export const putLinkService = (idLink, data) => {
    return new Promise(async (resolve, reject) => {
        const {
            tipo
        } = data;

        if (tipo) {

            if (tipo !== "pdf" && tipo !== "blog") {
                return resolve({
                    ok: false,
                    message: "tipo inválido",
                    estados: ["pdf", "blog"]
                });
            }
        }

        try {
            const link = await Link.findByPk(idLink);
            if (!link) return resolve({
                ok: false,
                message: "link no encontrado"
            })

            if (data.id) {
                delete data.id;
            }

            const linkActualizado = await link.update(data);
            await linkActualizado.save();

            resolve({
                ok: true,
                message: `"${link.titulo}" actualizado correctamente`,
                link: linkActualizado
            })

        } catch (error) {
            reject(error)
        }
    })
}

export const deleteLinkService = (idLink) => {
    return new Promise(async (resolve, reject) => {

        try {
            const buscarLink = await Link.findByPk(idLink);

            if (!buscarLink) return resolve({
                ok: false,
                message: "link no encontrado"
            })

            await buscarLink.destroy();

            resolve({
                ok: true,
                message: `"${buscarLink.titulo}" eliminado correctamente`
            })

        } catch (error) {
            reject(error)
        }
    })
}

*/
