const URL = 'http://localhost:9000/api/v1/'
export default {
    'URL': URL,
    'raiz': '/api/v1 + path + ruta',
    'URLRoutes': {
        'info': {
            'path': `${URL}informacion/`,
            'rutas': {
                '/historial': {
                    'metodos': ['get', 'post', 'delete', ['historial-delete-all', 'borrar todos los pqrs leidos - true']]
                },
                '/notificaciones': {
                    'metodos': ['get', 'post', 'put', 'delete', ['notificaciones-delete-all', 'borrar todos los pqrs leidos - true']]
                },
                '/pqrs': {
                    'metodos': ['get', 'post', ['put', 'no body'], 'delete', ['pqrs-delete-all', 'borrar todos las notificaciones leidas - true']]
                },
                '/vistas': {
                    'metodos': ['get', 'post', 'delete'],
                    'uso':'No params, no body'
                }
            }
        },
        'multimedia': {
            'path': `${URL}multimedia/`,
            'rutas': {
                '/archivos': {

                },
                '/galeria': {
                    'metodos': ['get', 'post', 'put', 'delete'],
                    'uso': 'recibe campo imagen'
                },
                '/slider': {
                    'metodos': ['get', 'post', 'delete'],
                    'uso': 'recibe id de imagen de galeria'
                },
                '/videos': {

                }
            }
        },
        'data': {
            'path': `${URL}data/`,
            'rutas': {
                '/anuncios': {
                    'metodos': ['get', 'post', 'put', 'delete'],
                    'uso': 'recibe campo imagen'
                },
                '/eventos': {
                    'metodos': ['get', 'post', 'put', 'delete']
                },
                '/categorias': {
                    'metodos': ['get']
                },
                '/items': {
                    'metodos': ['get', 'post', 'put', 'delete'],
                    'uso': 'recibe campo imagen'
                },
                '/links': {
                    'metodos': ['get', 'post', 'put', 'delete']
                },
                '/detalle-permisos': {
                    'metodos': ['get', 'post', 'delete']
                },
                '/noticias': {
                    'metodos': ['get', 'post', 'put', 'delete']
                },
                '/permisos': {
                    'metodos': ['get', 'post', 'put', 'delete'],
                    'uso': 'No permite modificar o borrar permisos por defecto'
                },
                '/roles': {
                    'metodos': ['get', 'put']
                },
                '/secciones': {
                    'metodos': ['get']
                },
                '/tokens': {
                    'metodos': ['get', 'post', 'put', 'delete']
                },
                '/usuarios': {
                    'metodos': ['get', 'post', 'put', 'delete']
                }
            }
        },
        'validacion': {
            'path': `${URL}validacion/`,
            'rutas': {
                '/login': {
                    'metodos': ['post']
                },
                '/logout': {
                    'metodos': ['post']
                },
                '/registro': {
                    'metodos': ['get']
                },
                '/verificar': {
                    'metodos': ['get']
                },
                '/perfil': {
                    'metodos': ['get']
                }
            }
        }
    }
}
