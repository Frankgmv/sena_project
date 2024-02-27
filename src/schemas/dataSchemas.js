import z from 'zod'
import { verificarHttpUrl } from '../helpers/includes.js'

export const permisoSchema = z.object({
    permiso: z.string({
            required_error: 'El permiso es requerido',
            invalid_type_error: 'El permiso debe ser un texto'
        }).min(10, 'EL permiso debe tener mínimo 10 carácteres')
        .max(50, 'El permiso debe tener máximo 50 carácteres'),
    permisoKey: z.string({
        required_error: 'El permisoKey es requerido',
        invalid_type_error: 'El permisoKey debe ser un texto'
    }).min(5, 'permisoKey debe tener mínimo 5 carácteres')
})

export const putPermisoSchema = z.object({
    permiso: z.string({
            required_error: 'El permiso es requerido',
            invalid_type_error: 'El permiso debe ser un texto'
        }).min(10, 'EL permiso debe tener mínimo 10 carácteres')
        .max(50, 'El permiso debe tener máximo 50 carácteres').optional(),
    permisoKey: z.string({
        required_error: 'El permisoKey es requerido',
        invalid_type_error: 'El permisoKey debe ser un texto'
    }).min(5, 'permisoKey debe tener mínimo 5 carácteres').optional()
}).nullable()

export const rolSchema = z.object({
    estado: z.boolean({
        required_error: 'El estado es requerido',
        invalid_type_error: 'El estado debe ser un booleano'
    })
})

export const usuarioSchema = z.object({
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
    RolId: z.number({
        required_error: 'El id_rol es requerido',
        invalid_type_error: 'El id_rol es un número'
    })
})

export const usuarioPutSchema = z.object({
    id: z.number({
            required_error: 'El documento es requerido',
            invalid_type_error: 'El documento es un número'
        }).min(10000000, 'El documento debe contener 8 carácteres mínimo')
        .max(10000000000, 'El documento debe contener 10 carácteres máximo').optional(),
    nombre: z.string({
            required_error: 'El Nombre es requerido',
            invalid_type_error: 'El Nombre debe ser un texto'
        }).min(3, 'EL Nombre debe tener mínimo 3 carácteres')
        .max(50, 'El Nombre debe tener máximo 50 carácteres').optional(),
    apellido: z.string({
            required_error: 'El Apellido es requerido',
            invalid_type_error: 'El Apellido debe ser un texto'
        }).min(3, 'EL Apellido debe tener mínimo 3 carácteres')
        .max(50, 'El Apellido debe tener máximo 50 carácteres').optional(),
    fechaNacimiento: z.string({
        required_error: 'La fecha de nacimiento es obligatoria'
    }).regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Fecha inválida, formato YYYY-MM-DD'
    }).optional(),
    correo: z.string({
            required_error: 'El Correo es requerido',
            invalid_type_error: 'El Correo debe ser un texto'
        })
        .max(100, 'El Correo debe tener máximo 50 carácteres').optional(),
    celular: z.string({
            required_error: 'El Celular es requerido'
        }).min(7, 'El Celular debe contener 7 carácteres mínimo')
        .max(15, 'El Celular debe contener 15 carácteres máximo').optional(),
    password: z.string({
            required_error: 'La contraseña es requerida',
            invalid_type_error: 'La contraseña debe ser un texto'
        }).min(8, 'La contraseña debe tener mínimo 8 carácteres')
        .max(50, 'La contraseña debe tener máximo 50 carácteres').optional(),
    RolId: z.number({
        required_error: 'El id_rol es requerido',
        invalid_type_error: 'El id_rol es un número'
    }).optional()
}).nullable()

export const detallePermisoSchema = z.object({
    UsuarioId: z.number({
        required_error: ' El UsuarioId es requerido',
        invalid_type_error: 'El UsuarioId debe ser un número'
    }),
    PermisoId: z.number({
        required_error: ' El PermisoId es requerido',
        invalid_type_error: 'El PermisoId debe ser un número'
    })
})

export const noticiaShema = z.object({
    titulo: z.string({
            required_error: 'El titulo es requerido',
            invalid_type_error: 'El titulo debe ser un texto'
        }).min(1, 'EL titulo debe tener minimo 5 caracteres')
        .max(50, 'el titulo es de maximo 100 caracteres'),
    encabezado: z.string({
        required_error: 'El encabezado es requerido',
        invalid_type_error: 'El encabezado debe ser un texto'
    }).max(100, 'El encabezado es muy extenso'),
    descripcion: z.string({
        required_error: 'La descripcion es requerida',
        invalid_type_error: 'La descripcion debe ser un texto'
    }).min(1, 'La descripcion es requerida'),
    UsuarioId: z.number({
        required_error: 'El UsuarioId es requerido',
        invalid_type_error: 'UsuarioId es un string si letras'
    }).min(1, 'El UsuarioId es requerido')
})

export const putNoticiaShema = z.object({
    titulo: z.string({
            required_error: 'El titulo es requerido',
            invalid_type_error: 'El titulo debe ser un texto'
        }).min(1, 'EL titulo debe tener minimo 5 caracteres')
        .max(50, 'el titulo es de maximo 100 caracteres').optional(),
    fecha: z.string({
        required_error: 'La fecha es requerida',
        invalid_type_error: 'La fecha debe ser un texto'
    }).regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Fecha inválida, formato YYYY-MM-DD'
    }).optional(),
    encabezado: z.string({
        required_error: 'El encabezado es requerido',
        invalid_type_error: 'El encabezado debe ser un texto'
    }).max(100, 'El encabezado es muy extenso').optional(),
    descripcion: z.string({
        required_error: 'La descripcion es requerida',
        invalid_type_error: 'La descripcion debe ser un texto'
    }).min(1, 'La descripcion es requerida').optional(),
    imgPath: z.string({
        required_error: 'La imgPath es requerida',
        invalid_type_error: 'La imgPath debe ser un texto'
    }).max(250).optional(),
    estado: z.boolean({
        invalid_type_error: 'El estado es buleano',
        required_error: 'El estado es requerido'
    }).optional(),
    UsuarioId: z.number({
        required_error: 'El UsuarioId es requerido',
        invalid_type_error: 'Usuario es un número'
    }).min(1, 'El UsuarioId es requerido').optional()
}).nullable()

export const linkSchema = z.object({
    titulo: z.string({
        required_error: 'titulo requerido',
        invalid_type_error: 'Titulo debe ser texto'
    }).max(30, 'Titulo muy largo (30 máximo)').min(5, 'Titulo muy corto (5 mín)'),
    link: z.string({
        required_error: 'Link requerido',
        invalid_type_error: 'Link debe ser URL - Link'
    }).refine(verificarHttpUrl, {
        message: 'La url debe contener http:// o https://'
    }),
    descripcion: z.string({
        invalid_type_error: 'la descripcion debe ser un texto'
    }).max(255, 'Descripcion muy larga (250 máx)').optional(),
    tipo: z.string({
        required_error: 'El tipo es pdf 0 blog',
        invalid_type_error: 'tipo debe ser texto'
    }).max(6, 'Tipo muy largo (6 máx) '),
    UsuarioId: z.number({
        required_error: 'UsuarioId requerido',
        invalid_type_error: 'Usuario es un número'
    }),
    SeccionId: z.number({
        required_error: 'SeccionId requerido',
        invalid_type_error: 'SeccionId es un número'
    }),
    CategoriaId: z.number({
        required_error: 'CategoriaId requerido',
        invalid_type_error: 'CategoriaId es un número'
    })
})

export const putLinkSchema = z.object({
    titulo: z.string({
        required_error: 'titulo requerido',
        invalid_type_error: 'Titulo debe ser texto'
    }).max(30, 'Titulo muy largo (30 máximo)').min(5, 'Titulo muy corto (5 mín)').optional(),
    link: z.string({
        required_error: 'Link requerido',
        invalid_type_error: 'Link debe ser URL - Link'
    }).refine(verificarHttpUrl, {
        message: 'La url debe contener http:// o https://'
    }).optional(),
    descripcion: z.string({
        invalid_type_error: 'la descripcion debe ser un texto'
    }).max(255, 'Descripcion muy larga (250 máx)').optional(),
    tipo: z.string({
        required_error: 'El tipo es pdf 0 blog',
        invalid_type_error: 'tipo debe ser texto'
    }).max(6, 'Tipo muy largo (6 máx) ').optional(),
    UsuarioId: z.number({
        required_error: 'UsuarioId requerido',
        invalid_type_error: 'Usuario es un número'
    }).optional(),
    SeccionId: z.number({
        required_error: 'SeccionId requerido',
        invalid_type_error: 'SeccionId es un número'
    }).optional(),
    CategoriaId: z.number({
        required_error: 'CategoriaId requerido',
        invalid_type_error: 'CategoriaId es un número'
    }).optional()
}).nullable()

export const credencialEmailSchema = z.object({
    correo: z.string({
        invalid_type_error: 'El correo es un texto que contiene @gmail.com'
    }).optional(),
    clave: z.string({
        invalid_type_error: 'La clave de terceros es un texto'
    }).optional(),
    UsuarioId: z.number({
        invalid_type_error: 'Usuario es un número'
    }).optional()
}).nullable()

export const anuncioSchema  = z.object({
    titulo: z.string({
        required_error: 'titulo requerido',
        invalid_type_error: 'Titulo debe ser texto'
    }).max(200, 'Titulo muy largo (200 máximo)').min(2, 'Titulo muy corto (2 mín)'),
    imgPath: z.string({
        required_error: 'Imagen Requerida',
        invalid_type_error: 'La imagen debe ser formato jpg y maximo 2mb'
    }).optional(),
    descripcion: z.string({
        invalid_type_error: 'la descripcion debe ser un texto'
    }).max(1200),
    UsuarioId: z.number({
        required_error: 'UsuarioId requerido',
        invalid_type_error: 'UsuarioId es un texto'
    }),
    SeccionId: z.number({
        required_error: 'SeccionId requerido',
        invalid_type_error: 'SeccionId es un número'
    })
})

export const putAnuncioSchema = z.object({
    titulo: z.string({
        required_error: 'titulo requerido',
        invalid_type_error: 'Titulo debe ser texto'
    }).max(100, 'Titulo muy largo (100 máximo)').min(5, 'Titulo muy corto (5 mín)').optional(),
    imgPath: z.string({
        required_error: 'Link requerido',
        invalid_type_error: 'Link debe ser URL - Link'
    }).optional(),
    descripcion: z.string({
        invalid_type_error: 'la descripcion debe ser un texto'
    }).max(1200).optional(),
    UsuarioId: z.number({
        required_error: 'UsuarioId requerido',
        invalid_type_error: 'Usuario es un número'
    }).optional(),
    SeccionId: z.string({
        required_error: 'SeccionId requerido',
        invalid_type_error: 'SeccionId es un número'
    }).optional()
}).nullable()

export const eventoSchema = z.object({
    evento: z.string({
            required_error: 'Nombre del evento requerido',
            invalid_type_error: 'El nombre debe ser un texto'
        })
        .max(70, 'Nombre largo (70 máx)').min(5, 'Nombre muy corto (5 mín)'),

    fecha: z.string({
        required_error: 'La fecha es requerida',
        invalid_type_error: 'La fecha debe ser un texto'
    }).regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Fecha inválida, formato YYYY-MM-DD'
    })
})

export const putEventoSchema = z.object({
    evento: z.string({
        required_error: 'Nombre del evento requerido',
        invalid_type_error: 'El nombre debe ser un texto'
    }).max(70, 'Nombre largo (70 máx)').min(5, 'Nombre muy corto (5 mín)').optional(),
    fecha: z.string({
        required_error: 'La fecha es requerida',
        invalid_type_error: 'La fecha debe ser un texto'
    }).regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Fecha inválida, formato YYYY-MM-DD'
    }).optional()
}).nullable()

export const tokenSchema = z.object({
    token: z.string({
        required_error: 'El token es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }),
    nombre: z.string({
        required_error: 'El nombre del token es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }),
    tokenKey: z.string({
        required_error: 'El Token Key es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }),
    tiempo: z.string({
        required_error: 'El tiempo del token es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }),
    UsuarioId: z.number({
        required_error: 'El id del usuario es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    })
})

export const putTokenSchema = z.object({
    token: z.string({
        required_error: 'El token es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }).optional(),
    nombre: z.string({
        required_error: 'El nombre del token es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }).optional(),
    tokenKey: z.string({
        required_error: 'El Token Key es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }).optional(),
    tiempo: z.string({
        required_error: 'El tiempo del token es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }).optional(),
    UsuarioId: z.number({
        required_error: 'El id del usuario es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }).optional()
}).nullable()

export const itemSchema = z.object({
    titulo: z.string({
        required_error: 'titulo requerido',
        invalid_type_error: 'Titulo debe ser texto'
    }).max(30, 'Titulo muy largo (30 máximo)').min(5, 'Titulo muy corto (5 mín)'),
    link: z.string({
        required_error: 'Link requerido',
        invalid_type_error: 'Link debe ser URL - Link'
    }).refine(verificarHttpUrl, {
        message: 'La url debe contener http:// o https://'
    }),
    estado: z.boolean({
        required_error: 'El estado es requerido',
        invalid_type_error: 'El estado debe ser un booleano'
    }).optional(),
    UsuarioId: z.number({
        required_error: 'El id del usuario es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    })
})

export const putItemSchema = z.object({
    titulo: z.string({
        required_error: 'titulo requerido',
        invalid_type_error: 'Titulo debe ser texto'
    }).max(30, 'Titulo muy largo (30 máximo)').min(5, 'Titulo muy corto (5 mín)').optional(),
    link: z.string({
        required_error: 'Link requerido',
        invalid_type_error: 'Link debe ser URL - Link'
    }).refine(verificarHttpUrl, {
        message: 'La url debe contener http:// o https://'
    }).optional(),
    estado: z.boolean({
        required_error: 'El estado es requerido',
        invalid_type_error: 'El estado debe ser un booleano'
    }).optional(),
    UsuarioId: z.number({
        required_error: 'El id del usuario es obligatorio',
        invalid_type_error: 'El tipo de dato es inválido'
    }).optional()
}).nullable()
