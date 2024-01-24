import z from 'zod'

export const galeriaSchema = z.object({
    titulo: z.string({
            required_error: 'El nombre del eveto es obligatorio',
            invalid_type_error: 'El nombre del evento debe ser un texto'
        }).min(10, 'El permiso debe tener mínimo 10 carácteres')
        .max(50, 'El evento debe tener máximo 50 carácteres'),
    UsuarioId: z.number({
        required_error: 'Usuario no puede estar vacío',
        invalid_type_error: 'Usuario debe ser una cadena de texto'
    }),
    EventoId: z.number({
        required_error: 'Evento no puede estar vacio',
        invalid_type_error: 'Evento debe ser una cadena de texto'
    })
})

export const putGaleriaSchema = z.object({
    titulo: z.string({
            required_error: 'El nombre del eveto es obligatorio',
            invalid_type_error: 'El nombre del evento debe ser un texto'
        }).min(10, 'El permiso debe tener mínimo 10 carácteres')
        .max(50, 'El evento debe tener máximo 50 carácteres').optional(),
    UsuarioId: z.number({
        required_error: 'Usuario no puede estar vacío',
        invalid_type_error: 'Usuario debe ser una cadena de texto'
    }).optional(),
    EventoId: z.number({
        required_error: 'Evento no puede estar vacio',
        invalid_type_error: 'Evento debe ser una cadena de texto'
    }).optional()
}).nullable()

export const sliderSchema = z.object({
    ImagenId: z.number({
        required_error: 'ImagenId requerida',
        invalid_type_error: 'ImagenId es un texto'
    })
})

export const videoSchema = z.object({
    UsuarioId: z.number({
        required_error: 'UsuarioId requerida',
        invalid_type_error: 'UsuarioId es un número'
    }),
    titulo: z.string({
        required_error: '',
        invalid_type_error: ''
    })
})

export const putVideoSchema = z.object({
    UsuarioId: z.number({
        required_error: 'UsuarioId requerida',
        invalid_type_error: 'UsuarioId es un número'
    }).optional(),
    titulo: z.string({
        required_error: '',
        invalid_type_error: ''
    }).optional()
}).nullable()

export const archivoSchema = z.object({
    titulo: z.string({
        required_error: 'El titulo del archivo es obligatorio',
        invalid_type_error : 'El titulo debe ser tipo String'
    }).min(8, 'El titulo debe tener minimo 8 carácteres')
    .max(60, 'El titulo debe tener máximo 60 carácteres'),
    UsuarioId: z.number({
        required_error: 'UsuarioId requerida',
        invalid_type_error: 'UsuarioId es un número'
    })
})