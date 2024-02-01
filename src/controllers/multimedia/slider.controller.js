import { deleteSliderService, getAllSliderService, getSliderService, postSliderService
} from '../../services/multimedia/slider.services.js'

export const postSlider = async (req, res, next) => {
    try {
        const nuevoRegistro = await postSliderService(req.body)
        res.json(nuevoRegistro)
        if (!nuevoRegistro) return res.status(400)
        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllSlider = async (req, res, next) => {
    try {
        const registros = await getAllSliderService()
        res.status(200).json(registros)
    } catch (error) {
        next(error)
    }
}

export const getSlider = async (req, res, next) => {
    try {
        const registros = await getSliderService(req.params.id)
        res.json(registros)
        if (!registros.ok) return res.status(400)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteSlider = async (req, res, next) => {
    try {
        const eliminarRegistro = await deleteSliderService(req.params.id)
        res.json(eliminarRegistro)
        if (!eliminarRegistro.ok) return res.status(400)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
