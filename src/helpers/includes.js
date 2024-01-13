import multer from "multer";
import path, { } from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/src/upload/'),
    filename: (req, file, cb) => {
        let formato = file.mimetype.split('/');
        const llaveUnica = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${llaveUnica}.${formato[formato.length - 1]}`);
    }
});

const fileFilter = (req, file, cb) => {
    
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'), false);
    }
  };


export const upload = multer({
    storage,
    fileFilter,
})

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}$/;

export const validarPassword = (password) => {

    return passwordRegex.test(password);
}

export const validarEmail = (email) => {

    return emailRegex.test(email);
}

export const esMayorDe15 = (fechaNacimiento) => {
    const fechaActual = new Date();
    const fechaUsuario = new Date(fechaNacimiento)

    const edad = (fechaActual.getFullYear() - fechaUsuario.getFullYear());

    return edad >= 15;
}

export const verificarHttpUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return false
    }
    return true;
}