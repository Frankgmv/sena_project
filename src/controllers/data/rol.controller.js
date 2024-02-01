import { getAllRolesService, getRolService, putRolService } from '../../services/data/rol.services.js'

export const getRoles = async (req, res, next) => {
    try {
        const roles = await getAllRolesService()
        res.json(roles)
        if (!roles.ok) return res.status(404)
        else return res.status(200)
    } catch (error) {
        next(error)
    }
}
export const getRol = async (req, res, next) => {
    try {
        const rol = await getRolService(req.params.id)
        res.json(rol)
        if (!rol.ok) return res.status(404)
        else return res.status(200)
    } catch (error) {
        next(error)
    }
}

export const putRol = async (req, res, next) => {
    try {
        const rolModificado = await putRolService(req.params.id, req.body)
        res.json(rolModificado)
        if (!rolModificado.ok) return res.status(404)
        else return res.status(200)
    } catch (error) {
        next(error)
    }
}
