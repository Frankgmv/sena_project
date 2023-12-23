const fabricaErrores = function (errorName) {
    return class ErrorPersonalizado extends Error {
        constructor(message) {
            super(message);
            this.name = errorName;
        }
    }
}

export const ErrorConexion = fabricaErrores("Error de conexión")