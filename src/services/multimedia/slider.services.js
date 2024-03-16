import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'
import Galeria from '../../models/multimedia/galeria.js'
import Slider from '../../models/multimedia/slider.js'

export const postSliderService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const consultarImagen = await Galeria.findByPk(data.ImagenId)
            if (!consultarImagen) {
                return resolve({
                    ok: false,
                    message: 'Imagen no encontrada'
                })
            }

            const existeYa = await Slider.findOne({
                where: {
                    ImagenId: data.ImagenId
                }
            })
            if (existeYa) {
                return resolve({
                    ok: false,
                    message: 'imagen ya en el Slider'
                })
            }

            let transaccion = await t.create()
            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            const crearSlider = await Slider.create(data, {
                transaction: transaccion.data
            })
            const guardar = await crearSlider.save()

            if (!guardar) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Imagen no se puedo agregar'
                })
            }
            await t.commit(transaccion.data)
            return resolve({
                ok: true,
                message: 'Imagen agregada a Slider'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllSliderService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const slidersRegistro = await Slider.findAll({
                include: [{
                    model: Galeria,
                    attributes: ['imgPath', 'titulo'],
                    as: 'imagenes'
                }]
            })

            resolve({
                ok: true,
                message: 'Lista de imagenes de Slider',
                data: slidersRegistro
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getSliderService = (idSlider) => {
    return new Promise(async (resolve, reject) => {
        try {
            const registroSlider = await Slider.findByPk(idSlider, {
                include: [{
                    model: Galeria,
                    attributes: ['imgPath', 'titulo'],
                    as: 'imagenes'
                }]
            })

            if (!registroSlider) {
                return resolve({
                    ok: true,
                    message: 'registro no encontrado'
                })
            }
            resolve({
                ok: true,
                message: 'Imagen encontrada',
                data: registroSlider
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteSliderService = (idSlider) => {
    return new Promise(async (resolve, reject) => {
        try {
            const consultarRegistro = await Slider.findByPk(idSlider)

            if (!consultarRegistro) {
                return resolve({
                    ok: true,
                    message: 'registro no encontrado'
                })
            }

            await consultarRegistro.destroy()

            resolve({
                ok: true,
                message: `Registro eliminado`
            })
        } catch (error) {
            reject(error)
        }
    })
}
