import multer from 'multer'

export const crearNombreImagenes = (file) => {
    let formato = file.mimetype.split('/')
    let nombreImg = file.originalname.split('.')

    const llaveUnica = `${Date.now()}_${Math.round(Math.random() * 1E4)}`
    const mimetype = formato[formato.length - 1]
    const nombre = `${nombreImg[0]}_${llaveUnica}.${mimetype}`

    return {nombre, mimetype}
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
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return false
    }
    return true
}
