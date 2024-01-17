import Categoria from '../../models/data/categoria.js'

export const getAllCategoriasService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const categorias = await Categoria.findAll()

            if (categorias.length === 0) {
 return resolve({
                ok: false,
                message: 'No hay categorias registradas',
                accionRecomendada:'Por favor agregue las categorias por defecto',
                categorias: categorias
            })
}

            resolve({
                ok: true,
                message: 'categorias obtenidas',
                categorias: categorias
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getCategoriaService = (idCategoria) => {
    return new Promise(async (resolve, reject) => {
        try {
            const categoria = await Categoria.findByPk(idCategoria)

            if (!categoria) {
 return resolve({
                ok: false,
                message: 'No se encontro la categoria'
            })
}

            resolve({
                ok: true,
                message: 'categoria obtenida',
                categoria: categoria
            })
        } catch (error) {
            reject(error)
        }
    })
}
