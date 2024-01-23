import z from 'zod'
import { verificarHttpUrl } from '../helpers/includes.js'

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
    link: z.string({
        required_error: 'Link es requerido',
        invalid_type_error: 'link es un URL'
    }).refine(verificarHttpUrl, {
        message: 'La url debe contener http:// o https://'
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
    link: z.string({
        required_error: 'Link es requerido',
        invalid_type_error: 'link es un URL'
    }).refine(verificarHttpUrl, {
        message: 'La url debe contener http:// o https://'
    }).optional(),
    titulo: z.string({
        required_error: '',
        invalid_type_error: ''
    }).optional()
}).nullable()
