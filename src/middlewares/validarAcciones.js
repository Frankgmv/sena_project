import { defaultVariables } from '../variables.js'
import Permiso from '../models/data/permiso.js'

export const validarPermisosKey = async (req, res, next) => {
    const { id } = req.params

    try {
        const permisoConsultado = await Permiso.findByPk(id)

        if (permisoConsultado) {
            const esta = defaultVariables.permisos.some(permiso => permiso.permisoKey === permisoConsultado.permisoKey)
            if (esta) {
                return res.status(400).json({
                ok:false,
                status:400,
                message: 'Permiso por defecto inmutable'
            })
} else {
                next()
            }
        } else {
            next()
        }
    } catch (error) {
        res.status(500).json({
            ok:false,
            status:500,
            errorServer: 'Error al validar acción',
            message: error.message
        })
    }
}
