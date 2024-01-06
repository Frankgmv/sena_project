import bcrypt from "bcryptjs";
import {
    Op
} from "sequelize";
import Usuario from "../../models/data/usuario.js";
import Rol from "../../models/data/rol.js";
import {
    esMayorDe15,
    validarEmail,
    validarPassword
} from "../../helpers/includes.js";
import "colors"
export const postUsuarioService = (data) => {
    return new Promise(async (resolve, reject) => {
        const {
            id: documento,
            fechaNacimiento,
            correo: email,
            password,
            RolId
        } = data
        const emailLower = email.toLowerCase();
        try {
            //  consultar roles
            const existeRol = await Rol.findByPk(RolId)

            // constular usuarios
            const isInto = await Usuario.findOne({
                where: {
                    [Op.or]: {
                        id: documento,
                        correo: emailLower
                    }
                }
            })

            // Validar que el rol exista
            if (!existeRol) return resolve({
                ok: false,
                mensage: "El rol no existe"
            })

            // validar que no existan correo o id en uso
            if (isInto) return resolve({
                ok: false,
                message: "El correo o documento ya están en uso",
            })

            // validar email
            if (!validarEmail(email)) return resolve({
                ok: false,
                message: `El correo ${email} es inválido`,
            })

            // validar password
            if (!validarPassword(password)) return resolve({
                ok: false,
                message: `Contraseña Inválida`,
                patron: "Debe tener ser de 8 car. y contener una mayúscula, una mínuscula, un número, un caracter especial"
            })

            // Validar la edad mayor a 15
            if (!esMayorDe15(fechaNacimiento)) return resolve({
                ok: false,
                mensage: "No eres mayor de 15 años"
            })

            // Encriptar
            const saltos = bcrypt.genSaltSync(10);
            const passwordHast = bcrypt.hashSync(password, saltos)

            // Crear usuario
            const nuevoUsuario = new Usuario({
                ...data,
                correo: emailLower,
                password: passwordHast
            })

            // Guardar en db
            const respuesta = await nuevoUsuario.save();

            resolve({
                ok: true,
                message: "usuario creado exitosamente!",
                usuario: respuesta
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllUsuariosService = (estado, pagina, num_usuarios = 12) => {

    var consulta = {
        offset: (pagina - 1) * num_usuarios,
        limit: +num_usuarios
    };

    return new Promise(async (resolve, reject) => {
        try {

            if (estado !== "activos" && estado !== "inactivos" && estado !== "todos") {
                return resolve({
                    ok: false,
                    message: "estado inválido",
                    estados: ["activos", "inactivos", "todos"]
                });
            }

            if (estado !== "todos") {

                var where = {
                    estado: {
                        $eq: estado === "activos" ? true : false
                    }
                }
                where.estado = estado === "activos" ? true : false;
                consulta = {
                    ...consulta,
                    where
                };
            }

            const usuarios = await Usuario.findAll(consulta);

            resolve({
                ok: true,
                total_usuarios: usuarios.length,
                limite: num_usuarios,
                estado,
                pagina,
                usuarios
            })

        } catch (error) {
            reject(error)
        }
    })
}
export const getUsuarioService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {

            const usuario = await Usuario.findByPk(idUser);
            if(!usuario) return resolve({
                ok:false,
                message:"usuario no encontrado"
            })

            resolve({
                ok:true,
                usuario
            })

        } catch (error) {
            reject(error)
        }
    })
}
export const putUsuarioService = (idUser, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usuario = await Usuario.findByPk(idUser);
            if(!usuario) return resolve({
                ok:false,
                message:"usuario no encontrado"
            })

            if(data?.id){
                delete data.id;
            }

            const usuarioActualizado = await usuario.update(data);

            resolve({
                ok:true,
                message:" Usuario Actualizado correctamente",
                usuarioActualizado
            })

        } catch (error) {
            reject(error)
        }
    })
}
export const deleteUsuarioService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usuario = await Usuario.findByPk(idUser);
            if(!usuario) return resolve({
                ok:false,
                message:"usuario no encontrado"
            })

            const eliminado = await usuario.destroy();

            resolve({
                ok:true,
                message:" Usuario Eliminado correctamente"
            })

        } catch (error) {
            reject(error)
        }
    })
}