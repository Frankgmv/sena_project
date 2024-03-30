import bcript from 'bcryptjs'
import { generarCodigoAleatorio, validarEmail } from '../../helpers/includes.js'
import { getUsuarioService, putUsuarioService } from '../../services/data/usuario.services.js'
import { deleteTokenService, getTokenByKeyService, postTokenService } from '../../services/data/token.services.js'
import 'colors'
import { createTokenAccess, validarToken } from '../../lib/jwt.js'
import { enviarEmail } from '../../lib/nodemailer.js'

export const postCrearCodigo = async (req, res, next) => {
    try {
        const { id, correo } = req.body
        if (!validarEmail(correo)) {
            return res.status(400).json({
                ok: false,
                message: 'Correo inválido, solo recibe @gmail.com'
            })
        }

        const consultarUsuario = await getUsuarioService(id)

        if (!consultarUsuario.ok) {
            return res.status(404).json(consultarUsuario)
        }

        if (correo !== consultarUsuario.data.correo) {
            return res.status(400).json({
                ok:false,
                message: 'El correo no coincide con guardado'
            })
        }

        const dataToken = {
            nombre:  `Recuperar password ${consultarUsuario.data.nombre}`,
            token: generarCodigoAleatorio(),
            tokenKey: `RECUP_PASSWORD_${consultarUsuario.data.id}`,
            tiempo: '1d',
            UsuarioId: consultarUsuario.data.id
        }

        const messageEmail = `Recuperación de cuenta.\n \n \t \t Este es tu código de Recuperacion:  ${dataToken.token} \n \n Si tienes problemas con el código de recuperación puedes intentar nuevamente. \n Continua sin funcionar, puedes contactar con el administrador.`

        await enviarEmail(messageEmail, consultarUsuario.data.correo, '[I. E. Centenario de Pereira] Recuperación de cuenta')

        let eliminarToken
        const existeToken = await getTokenByKeyService(dataToken.tokenKey)

        if (existeToken.ok) {
            eliminarToken = await deleteTokenService(existeToken.data.id)

            if (!eliminarToken.ok) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al remplazar Código de recuperación'
                })
            }
        }

        const crearToken = await postTokenService(dataToken)
        res.status(201).json(crearToken)
    } catch (error) {
        next(error)
    }
}

export const postValidarCodigo = async (req, res, next) => {
    try {
        const { id, token } = req.body
        const tokenKey = `RECUP_PASSWORD_${id}`

        const consultarRegistro = await getTokenByKeyService(tokenKey)

        if (!consultarRegistro.ok) {
            return res.status(404).json({
                ok: false,
                message: 'Código no encontrado'
            })
        }

        const isMatch = await bcript.compare(token, consultarRegistro.data.token)

        if (!isMatch) {
            return res.status(400).json({
                ok: false,
                message: 'Código inválido'
            })
        }

        const eliminarToken = await deleteTokenService(consultarRegistro.data.id)

        if (!eliminarToken.ok) {
            return res.status(400).json({
                ok: false,
                message: 'Error al remplazar Código de recuperación'
            })
        }

        // Crear Cookie
        const recuperar = await createTokenAccess({ token }, '1h')

        res.setHeader('credential-reset', recuperar)
        .cookie('recuperar', recuperar, {
            path:'/',
            httpOnly: true,
            maxAge: 3600000
        }).status(200).json({
            ok: true,
            message: 'insertar nueva contraseña',
            credential:recuperar
        })
    } catch (error) {
        next(error)
    }
}

export const updatePassword = async (req, res, next) => {
    const valueToken =  req.headers['credential-reset']

    if (!valueToken) {
        return res.status(401).json({
            ok: false,
            message: 'Intento expirado, intenta de nuevo'
        })
    }

    try {
        await validarToken(valueToken)

        const { body:{ password }, params: { id } } = req
        const updateUser = await putUsuarioService(id, { password })
        res.json(updateUser)
        if (!updateUser.ok) return res.status(400)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
