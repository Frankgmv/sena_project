import z from "zod"
import { validarFormatoFecha } from "../middlewares/validarAcciones.js";


export const permisoSchema = z.object({
    permiso: z.string({
            required_error: "El permiso es requerido",
            invalid_type_error: "El permiso debe ser un texto"
        }).min(10, "EL permiso debe tener mínimo 10 carácteres")
        .max(50, "El permiso debe tener máximo 50 carácteres"),
    permisoKey: z.string({
        required_error: "El permisoKey es requerido",
        invalid_type_error: "El permisoKey debe ser un texto"
    }).min(5, "permisoKey debe tener mínimo 5 carácteres")
})

export const rolSchema = z.object({
    estado: z.boolean({
        required_error: "El estado es requerido",
        invalid_type_error: "El estado debe ser un booleano"
    })
})

export const usuarioSchema = z.object({
    id: z.number({
            required_error: "El documento es requerido",
            invalid_type_error: "El documento es un número",
        }).min(10000000, "El documento debe contener 8 carácteres mínimo")
        .max(10000000000, "El documento debe contener 10 carácteres máximo"),
    nombre: z.string({
            required_error: "El Nombre es requerido",
            invalid_type_error: "El Nombre debe ser un texto"
        }).min(3, "EL Nombre debe tener mínimo 3 carácteres")
        .max(50, "El Nombre debe tener máximo 50 carácteres"),
    apellido: z.string({
            required_error: "El Apellido es requerido",
            invalid_type_error: "El Apellido debe ser un texto"
        }).min(3, "EL Apellido debe tener mínimo 3 carácteres")
        .max(50, "El Apellido debe tener máximo 50 carácteres"),
    fechaNacimiento: z.string({
        required_error: "La fecha de nacimiento es obligatoria"
    }).refine(validarFormatoFecha, {
        message: "El formato debe ser YYYY/MM/DD"
    }),
    correo: z.string({
            required_error: "El Correo es requerido",
            invalid_type_error: "El Correo debe ser un texto"
        })
        .max(100, "El Correo debe tener máximo 50 carácteres"),
    celular: z.string({
            required_error: "El Celular es requerido",
        }).min(7, "El Celular debe contener 7 carácteres mínimo")
        .max(15, "El Celular debe contener 15 carácteres máximo"),
    password: z.string({
            required_error: "La contraseña es requerida",
            invalid_type_error: "La contraseña debe ser un texto"
        }).min(8, "La contraseña debe tener mínimo 8 carácteres")
        .max(50, "La contraseña debe tener máximo 50 carácteres"),
    RolId:z.number({
        required_error: "El id_rol es requerido",
        invalid_type_error: "El id_rol es un número",
    })
});

export const usuarioPutSchema =  z.object({
    id: z.number({
            required_error: "El documento es requerido",
            invalid_type_error: "El documento es un número",
        }).min(10000000, "El documento debe contener 8 carácteres mínimo")
        .max(10000000000, "El documento debe contener 10 carácteres máximo").optional(),
    nombre: z.string({
            required_error: "El Nombre es requerido",
            invalid_type_error: "El Nombre debe ser un texto"
        }).min(3, "EL Nombre debe tener mínimo 3 carácteres")
        .max(50, "El Nombre debe tener máximo 50 carácteres").optional(),
    apellido: z.string({
            required_error: "El Apellido es requerido",
            invalid_type_error: "El Apellido debe ser un texto"
        }).min(3, "EL Apellido debe tener mínimo 3 carácteres")
        .max(50, "El Apellido debe tener máximo 50 carácteres").optional(),
    fechaNacimiento: z.string({
        required_error: "La fecha de nacimiento es obligatoria"
    }).refine(validarFormatoFecha, {
        message: "El formato debe ser YYYY/MM/DD"
    }).optional(),
    correo: z.string({
            required_error: "El Correo es requerido",
            invalid_type_error: "El Correo debe ser un texto"
        })
        .max(100, "El Correo debe tener máximo 50 carácteres").optional(),
    celular: z.string({
            required_error: "El Celular es requerido",
        }).min(7, "El Celular debe contener 7 carácteres mínimo")
        .max(15, "El Celular debe contener 15 carácteres máximo").optional(),
    password: z.string({
            required_error: "La contraseña es requerida",
            invalid_type_error: "La contraseña debe ser un texto"
        }).min(8, "La contraseña debe tener mínimo 8 carácteres")
        .max(50, "La contraseña debe tener máximo 50 carácteres").optional(),
    RolId:z.number({
        required_error: "El id_rol es requerido",
        invalid_type_error: "El id_rol es un número",
    }).optional()
}).nullable();