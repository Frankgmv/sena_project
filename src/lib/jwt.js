import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()
export function createTokenAccess(payLoad, time = '12h') {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payLoad,
            process.env.SECRET_KEY_TOKEN, {
                expiresIn: time
            },
            (err, token) => {
                if (err) {
                    return reject(err)
                }
                resolve(token)
            }
        )
    })
}

export function validarToken(payLoad) {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(
                payLoad,
                process.env.SECRET_KEY_TOKEN,
                (err, token) => {
                    if (err) reject('Credenciales expiradas o inválidas')
                    resolve(token)
                }
            )
        } catch (error) {
            reject(error)
        }
    })
}
