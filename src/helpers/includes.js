import multer from 'multer'
import fs from 'fs'

export const crearNombreRecurso = (file) => {
    let formato = file.mimetype.split('/')
    let nombreImg = file.originalname.split('.')

    const llaveUnica = `${formato[0]}_${Date.now()}_${Math.round(Math.random() * 1E4)}`
    const mimetype = formato[formato.length - 1]
    const nombre = `${nombreImg[0]}_${llaveUnica}.${mimetype}`.replace(/\s/g, '').toLowerCase()
    return {
        nombre,
        mimetype
    }
}

export const upload = multer({
    storage: multer.memoryStorage()
})

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}$/

export const validarPassword = (password) => {
    return passwordRegex.test(password)
}

export const validarEmail = (email) => {
    return emailRegex.test(email)
}

export const esMayorDe15 = (fechaNacimiento) => {
    const fechaActual = new Date()
    const fechaUsuario = new Date(fechaNacimiento)

    const edad = (fechaActual.getFullYear() - fechaUsuario.getFullYear())

    return edad >= 15
}

export const verificarHttpUrl = (url) => {
    return !(!url.startsWith('http://') && !url.startsWith('https://'))
}
export const verificarHttpUrlOIframe = (url) => {
    return !(!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('<iframe'))
}

export const deleteFile = (pathFile) => {
    let path = `src/upload/${pathFile}`
    const existe = fs.existsSync(path)

    if (path && existe) {
        fs.rm(path, (err) => {
            if (err) return true
            else return false
        })
    }
}
