import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
export function createTokenAccess(payLoad) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payLoad,
            process.env.SECRET_KEY_TOKEN,
            {
                expiresIn: '1d'
            },
            (err, token) => {
                if (err) reject('hay un error')
                resolve(token)
            }
        )
    })
}

export function validarToken(payLoad) {
    return new Promise((resolve, reject) => {
        jwt.verify(
            payLoad,
            process.env.SECRET_KEY_TOKEN,
            (err, token) => {
                if (err) reject('credenciales vencidas o inválidas (JWT)')
                resolve(token)
            }
        )
    })
}

