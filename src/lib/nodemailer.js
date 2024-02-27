import nodemailer from 'nodemailer'
import { config } from 'dotenv'
import { getCredencialService } from '../services/data/credencial.services.js'
import { CredencialError } from '../middlewares/fabricaErrores.js'

config()

const getConfigNodemail = async () => {
    const configNodemailer = {
        host: 'smtp.gmail.com',
        port: 587,
        tls: {
          rejectUnauthorized: false
        }
    }

    const dataEmails = await getCredencialService()

    if (dataEmails.ok) {
        let { correo, clave } = dataEmails.data
        configNodemailer.auth = {
            user: correo,
            pass: clave
        }
    } else {
        throw new CredencialError('Error al intentar obtener los credenciales')
    }

    return configNodemailer
}

export const enviarEmail = (text, email, subject = 'I. E. Centenario de Pereira') => {
    return new Promise(async (resolve, reject) => {
        try {
            const configNodemailer = await getConfigNodemail()
            const transportData = nodemailer.createTransport(configNodemailer)

            const message = {
                from: configNodemailer.auth.user,
                to: email,
                subject,
                text
            }

            const infoRespose = await transportData.sendMail(message)

            resolve(infoRespose)
        } catch (error) {
            reject(error)
        }
    })
}
