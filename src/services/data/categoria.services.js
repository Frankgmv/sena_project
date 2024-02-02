import Categoria from '../../models/data/categoria.js'

export const getAllCategoriasService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const categorias = await Categoria.findAll()

            resolve({
                ok: true,
                message: 'Lista de categorias',
                data: categorias
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
                    message: 'Categoria no encontrada'
                })
            }

            resolve({
                ok: true,
                message: 'categoria obtenida',
                data: categoria
            })
        } catch (error) {
            reject(error)
        }
    })
}
