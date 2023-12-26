import z from "zod"


export const pqrsSchema = z.object({
    nombre: z.string({
        required_error: "El Nombre es obligatorio",
        invalid_type_error: "El Nombre debe ser un texto"
    }).min(3, "EL Nombre debe ser de minímo 3 caracteres"),
    apellido: z.string({
        required_error: "El Apellido es obligatorio",
        invalid_type_error: "El Apellido debe ser un texto"
    }).min(3, "EL Apellido debe ser de minímo 3 caracteres"),
    tipo: z.string({
        required_error: "El Tipo es obligatorio"
    }).nonempty("Rellene el tipo de PQRS"),
    reminente: z.string({
        required_error: "El Remitente es obligatorio"
    }).nonempty("Rellene el Remitente"),
    correo: z.string({
        required_error: "El Correo es obligatorio",
        invalid_type_error: "El Correo debe ser un texto"
    }).email({
        message: "Correo inválido",
    }),
    numeroContacto: z.string({
            required_error: "EL número de contacto es requerido",
            invalid_type_error: "tipo de dato inválido"
        })
        .min(7, "EL número de contacto debe ser de minímo 7 caracteres")
        .max(10, "EL número de contacto debe ser de máximo 10 caracteres"),
    mensaje: z.string({
        required_error: "EL Mensaje es requerido",
        invalid_type_error: "deber ser un texto"
    }).min(20, "El Mensaje debe tener más contenido.")
})


export const notificacionSchema = z.object({
    titulo: z.string({
        required_error: 'El Título es obligatorio',
        invalid_type_error:'tipo de dato inválido'
    }),
    descripcion: z.string({
        required_error: 'La Descripción es obligatorio',
        invalid_type_error:'tipo de dato inválido'
    })
})