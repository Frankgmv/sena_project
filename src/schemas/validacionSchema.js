import z from 'zod'

export const registroSchema = z.object({
    id: z.number({
            required_error: 'El documento es requerido',
            invalid_type_error: 'El documento es un número'
        }).min(10000000, 'El documento debe contener 8 carácteres mínimo')
        .max(10000000000, 'El documento debe contener 10 carácteres máximo'),
    nombre: z.string({
            required_error: 'El Nombre es requerido',
            invalid_type_error: 'El Nombre debe ser un texto'
        }).min(3, 'EL Nombre debe tener mínimo 3 carácteres')
        .max(50, 'El Nombre debe tener máximo 50 carácteres'),
    apellido: z.string({
            required_error: 'El Apellido es requerido',
            invalid_type_error: 'El Apellido debe ser un texto'
        }).min(3, 'EL Apellido debe tener mínimo 3 carácteres')
        .max(50, 'El Apellido debe tener máximo 50 carácteres'),
    fechaNacimiento: z.string({
        required_error: 'La fecha de nacimiento es obligatoria'
    }).regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Fecha inválida, formato YYYY-MM-DD'
    }),
    correo: z.string({
            required_error: 'El Correo es requerido',
            invalid_type_error: 'El Correo debe ser un texto'
        })
        .max(100, 'El Correo debe tener máximo 50 carácteres'),
    celular: z.string({
            required_error: 'El Celular es requerido'
        }).min(7, 'El Celular debe contener 7 carácteres mínimo')
        .max(15, 'El Celular debe contener 15 carácteres máximo'),
    password: z.string({
            required_error: 'La contraseña es requerida',
            invalid_type_error: 'La contraseña debe ser un texto'
        }).min(8, 'La contraseña debe tener mínimo 8 carácteres')
        .max(50, 'La contraseña debe tener máximo 50 carácteres'),
    claveEspecial: z.string({
            required_error: 'La Clave Especial es requerida',
            invalid_type_error: 'La Clave Especial debe ser un texto'
        }),
    RolId: z.number({
        required_error: 'El rol es requerido',
        invalid_type_error: 'El rol es un número'
    })
})

export const loginSchema = z.object({
    id: z.number({
        required_error: 'El documento es requerido',
        invalid_type_error: 'El documento es un número'
    }).min(10000000, 'El documento debe contener 8 carácteres mínimo')
    .max(10000000000, 'El documento debe contener 10 carácteres máximo'),
    password: z.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un texto'
    }).min(8, 'La contraseña debe tener mínimo 8 carácteres')
    .max(50, 'La contraseña debe tener máximo 50 carácteres'),
RolId: z.number({
    required_error: 'el rol es requerido',
    invalid_type_error: 'El rol es un número'
})
})

export const crearRecuperacionSchema = z.object({
    id: z.number({
        required_error: 'El documento es requerido',
        invalid_type_error: 'El documento es un número'
    }).min(10000000, 'El documento debe contener 8 carácteres mínimo')
    .max(10000000000, 'El documento debe contener 10 carácteres máximo'),
    correo: z.string({
        required_error: 'El Correo es requerido',
        invalid_type_error: 'El Correo debe ser un texto'
    }).max(100, 'El Correo debe tener máximo 50 carácteres')
})

export const validacionRecuperacionSchema = z.object({
    id: z.number({
        required_error: 'El documento es requerido',
        invalid_type_error: 'El documento es un número'
    }).min(10000000, 'El documento debe contener 8 carácteres mínimo')
    .max(10000000000, 'El documento debe contener 10 carácteres máximo'),
    token: z.string({
        required_error: 'El token es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    })
})

export const cambiarPassword = z.object({
    password: z.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un texto'
    }).min(8, 'La contraseña debe tener mínimo 8 carácteres')
    .max(50, 'La contraseña debe tener máximo 50 carácteres')
})
