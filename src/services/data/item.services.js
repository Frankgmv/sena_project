import { Op } from 'sequelize'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'
import Item from '../../models/data/item.js'
import Usuario from '../../models/data/usuario.js'

export const postItemService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const consultaUsuario = await Usuario.findByPk(data.UsuarioId)
            if (!consultaUsuario) {
                return resolve({
                    ok: false,
                    message: 'UsuarioId no encontrado'
                })
            }

            const constularTitulo = await Item.findOne({
                where: {
                    [Op.or]: {
                        titulo: data.titulo,
                        link: data.link
                    }
                }
            })
            if (constularTitulo) {
                return resolve({
                    ok: false,
                    message: 'Titulo o Link en uso'
                })
            }

            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const crearItem = await Item.create(data, {
                transaction: transaccion.data
            })

            const guardar = await crearItem.save()

            if (!guardar) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Item no creado'
                })
            }
            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Item creado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllItemService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const items = await Item.findAll()

            resolve({
                ok:true,
                message: 'Lista de items',
                data: items
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getItemService = (idItem) => {
    return new Promise(async (resolve, reject) => {
        try {
            const item = await Item.findByPk(idItem)

            if (!item) {
                return resolve({
                    ok:false,
                    message:  'Item no encontrado'
                })
            }

            resolve({
                ok:true,
                message: 'Item obtenido',
                data: item
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putItemService = (idItem, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id) {
                delete data.id
            }

            let item = await Item.findByPk(idItem)

            if (!item) {
                return resolve({
                    ok: false,
                    message: 'ItemId no encontrado'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const modificarItem = await item.update(data, {
                transaction: transaccion.data
            })

            if (!modificarItem) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Item no fue modificado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Item modificado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteItemService = (idItem) => {
    return new Promise(async (resolve, reject) => {
        try {
            const item = await Item.findByPk(idItem)

            if (!item) {
                return resolve({
                    ok:false,
                    message:  'Item no encontrado'
                })
            }
            await item.destroy()

            resolve({
                ok:true,
                message: `item eliminado`
            })
        } catch (error) {
            reject(error)
        }
    })
}
