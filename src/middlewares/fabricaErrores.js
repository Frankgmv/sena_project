const fabricaErrores = function(errorName) {
    return class ErrorPersonalizado extends Error {
        constructor(message) {
            super(message)
            this.name = errorName
        }
    }
}

export const ErrorConexion = fabricaErrores('Error de conexión')
export const ErrorPermiso = fabricaErrores('Fail Permiso Model')
export const ErrorRol = fabricaErrores('Fail Rol Model')
export const ErrorSeccion = fabricaErrores('Fail Seccion Model')
export const ErrorCategoria = fabricaErrores('Fail Categoria Model')
export const TestError = fabricaErrores('Prueba en Roles')
export const TransactionError = fabricaErrores('Transaction Error')
export const UsuarioError = fabricaErrores('Usuario Error')
export const TokenError = fabricaErrores('Token Error')
export const DetalleError = fabricaErrores('DetallePermiso Error')
export const CredencialError = fabricaErrores('Error en Credencial')
