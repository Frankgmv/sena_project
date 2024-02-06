import nodemailer from 'nodemailer'
import {
    config
} from 'dotenv'

config()

export const configNodemailer = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
}

export const enviarEmail = (text, email, subject = 'I. E. Centenario de Pereira') => {
    return new Promise(async (resolve, reject) => {
        try {
            const transportData = nodemailer.createTransport(configNodemailer)

            const message = {
                from: process.env.EMAIL_USER,
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
