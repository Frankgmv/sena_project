import bcrypt from "bcryptjs";
import Usuario from "../../models/data/usuario.js";
import Rol from "../../models/data/rol.js";
import { esMayorDe15,validarEmail, validarPassword
} from "../../helpers/includes.js";

export const postUsuarioService = (data) => {
    return new Primise(async (resolve, reject) => {

        const { id, fechaNacimiento, correo, password, id_rol
        } = data

        try {
            // constular usuarios
            const isInto = await Usuario.findAll({
                where: {
                    or: [{correo}, {id}]
                }
            })
            //  consultar roles
            const existeRol = await Rol.findByPk(id_rol)

            // Validar que el rol exista
            if (!existeRol) return resolve({
                ok:false,
                mensage: "El rol no existe"
            })

            // validar que no existan correo o id en uso
            if (isInto.length !== 0) return resolve({
                ok: false,
                message: "El correo o documento ya están en uso",
                Usuario: isInto
            })

            // validar email
            if (!validarEmail(correo)) return resolve({
                ok: false,
                message: `El correo ${correo} es inválido`,
            })

            // validar password
            if (!validarPassword(password)) return resolve({
                ok: false,
                message: `Contraseña Inválida`,
                patron:"Debe tener ser de 8 car. y contener una mayúscula, una mínuscula, un número, un caracter especial"
            })

            // Validar la edad mayor a 15
            if(!esMayorDe15(fechaNacimiento)) return resolve({
                ok:false,
                mensage:"No eres mayor de 15 años"
            })

            const saltos = bcrypt.genSaltSync(10);
            const passwordHast = bcrypt.hashSync(password, saltos)

            const nuevoUsuario = await Usuario.create({
                ...data,
                password: passwordHast
            })

            resolve({
                ok: true,
                message: "usuario creado exitosamente!",
                usuario: nuevoUsuario
            })

        } catch (error) {
            reject(error)
        }
    })
}

export const getAllUsuariosService = () => {
    return new Primise(async (resolve, reject) => {

    })
}
export const getUsuarioService = (idUser) => {
    return new Primise(async (resolve, reject) => {

    })
}
export const putUsuarioService = (idUser, data) => {
    return new Primise(async (resolve, reject) => {

    })
}
export const deleteUsuarioService = (idUser) => {
    return new Primise(async (resolve, reject) => {

    })
}