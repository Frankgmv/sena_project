import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const authRutas = async (req, res, next) => {
    const { accessToken } = req.cookies

    if (!accessToken) {
        return res.status(401).json({
            ok: false,
            message:'No Token, Authorization Denegada'
        })
    }

    jwt.verify(accessToken, process.env.SECRET_KEY_TOKEN, (err, usuario) => {
        if (err) {
            return res.status(403).json({
            ok: false,
            message:'Token Inválido'
            })
        }

        req.usuario = usuario
        next()
    })
}
