export default {
    'URL': 'http://localhost:9000/api/v1/',
    'raiz': '/api/v1 + path + ruta',
    'URLRoutes': {
        'info': {
            'path': '/informacion',
            'rutas': {
                '/historial': {

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
            'path': '/multimedia',
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
            'path': '/data',
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
            'path': '/validacion',
            'rutas': {
                '/login': {

                },
                '/logout': {

                },
                '/verificacion': {

                },
                '/registro': {

                }
            }
        }
    }
}
