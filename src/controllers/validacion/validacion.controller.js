import bcrypt from 'bcryptjs'
import {
    getAllTokenService
} from '../../services/data/token.services.js'
import {
    getUsuarioService,
    postUsuarioService
} from '../../services/data/usuario.services.js'
import {
    createTokenAccess
} from '../../lib/jwt.js'

export const postRegistro = async (req, res, next) => {
    try {
        const {
            claveEspecial
        } = req.body

        const consultarDB = await getAllTokenService()
        const tokenEspecial = consultarDB.find(token => token.tokenKey === 'CL_ESPECIAL')

        if (!tokenEspecial) {
            return res.status(404).json({
                ok: false,
                message: 'No existe el clave especial guardada'
            })
        }

        const isMatch = await bcrypt.compare(claveEspecial, tokenEspecial)

        if (!isMatch) {
            return res.status(404).json({
                ok: false,
                message: 'Clave especial inválida'
            })
        }

        const guardarUsuario = await postUsuarioService(req.body)

        if (!guardarUsuario.ok) {
            return res.status(400).json(guardarUsuario)
        }
        const consultarUsuario = await getUsuarioService(req.body.id)

        if (!consultarUsuario.ok) {
            return res.status(400).json({
                ok: false,
                message: 'iniciar sesión en el sistema'
            })
        }

        const accessToken = await createTokenAccess(consultarUsuario)
        res.cookie('jwt', accessToken)
        res.status(201).json(guardarUsuario)
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(0)
    })

    res.sendStatus(200)
}
