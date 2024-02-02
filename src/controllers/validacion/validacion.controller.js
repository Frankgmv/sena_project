import bcrypt from 'bcryptjs'
import { getTokenKeyService } from '../../services/data/token.services.js'
import { getUsuarioService, postUsuarioService } from '../../services/data/usuario.services.js'
import { createTokenAccess, validarToken } from '../../lib/jwt.js'

export const postRegistro = async (req, res, next) => {
    try {
        const {
            claveEspecial
        } = req.body

        let tokenEspecial
        const consultarDB = await getTokenKeyService('CL_ESPECIAL')

        if (!consultarDB.ok) {
            return res.status(404).json({
                ok: false,
                message: 'No se puedo obtener la llave de registro'
            })
        } else {
            tokenEspecial = consultarDB.data.token
        }

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
        const accessToken = await createTokenAccess(consultarUsuario.data.dataValues)
        res.cookie('accessToken', accessToken)
        res.status(201).json(guardarUsuario)
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    try {
        res.cookie('accessToken', '', {
            expires: new Date(0)
        })
        res.cookie('jwt', '', {
            expires: new Date(0)
        })

        res.status(200).json({
            ok: true,
            message: 'sessión cerrada'
        })
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const consultarUsuario = await getUsuarioService(req.body.id)

        if (!consultarUsuario.ok) {
            res.status(404).json(consultarUsuario)
        }

        const dataUsuario = consultarUsuario.data.dataValues

        const isMatchPassword = await bcrypt.compare(req.body.password, dataUsuario.password)

        if (!isMatchPassword || (dataUsuario.RolId !== req.body.RolId)) {
            res.status(404).json({
                ok: false,
                message: 'Credenciales inválidos'
            })
        }

        const accessToken = await createTokenAccess(dataUsuario)
        res.cookie('accessToken', accessToken)
        res.status(200).json({
            ok: true,
            message: 'Bienvenido'
        })
    } catch (error) {
        next(error)
    }
}

export const verificarToken = async (req, res, next) => {
    const {
        accessToken
    } = req.cookies

    if (!accessToken) {
        return res.status(401).json({
            ok: false,
            message: 'NO Autorizado'
        })
    }

    try {
        const dataToken = await validarToken(accessToken)

        res.status(200).json({
            ok: true,
            message: 'Token verificado',
            data: {
                id: dataToken.id,
                nombre: dataToken.nombre,
                apellido: dataToken.apellido,
                correo: dataToken.correo,
                RolId: dataToken.RolId
            }
        })
    } catch (error) {
        next(error)
    }
}

export const perfil = async (req, res, next) => {
    try {
        let usuario = await getUsuarioService(req.usuario.id)

        if (!usuario) {
            return res.status(400).json(usuario)
        }
        if (usuario.data.password) {
            usuario.data.password = 'dato privado'
            delete usuario.data.password
        }

        res.status(200).json(usuario)
    } catch (error) {
        next(error)
    }
}
