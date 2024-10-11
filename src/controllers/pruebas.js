import { enviarEmail } from '../lib/nodemailer.js'

export const sendEmailExterno = async (req, res, next) => {
    try {
        const {para, asunto, cuerpo} =  req.body

        await enviarEmail(cuerpo, para, asunto)

        res.status(200).json({ok: true, message:  'Enviado exitosamente...'})
    } catch (error) {
        next(error.message)
    }
}
