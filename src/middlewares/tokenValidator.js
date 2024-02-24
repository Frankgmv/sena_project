import jwt from 'jsonwebtoken'
import {
    config
} from 'dotenv'

config()

export const authRutas = async (req, res, next) => {
    const headers = req.headers['authorization']
    let token
    if (headers.startsWith('Bearer ')) {
        token = headers.split(' ')[1]
    } else {
        return res.status(400).json({
            ok: false,
            message: 'Error, inicia sesión nuevamente'
        })
    }

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No Token. Autorization Denegada'
        })
    }

    jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, usuario) => {
        if (err) {
            return res.status(403).json({
                ok: false,
                message: 'Token Inválido'
            })
        }

        req.usuario = usuario
        next()
    })
}
