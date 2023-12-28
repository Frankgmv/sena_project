import z from "zod"

export const permisoSchema = z.object({
    permiso: z.string({
        required_error: "El permiso es requerido",
        invalid_type_error: "El permiso debe ser un texto"
    }).min(10, "EL permiso debe tener mínimo 10 carácteres")
    .max(50, "El rol debe tener máximo 50 carácteres")
    .nonempty("El permiso no puede estar vacío"),
    permisoKey: z.string({
        required_error: "El permisoKey es requerido",
        invalid_type_error: "El permisoKey debe ser un texto"
    }).min(5, "permisoKey debe tener mínimo 5 carácteres")
    .nonempty("El permisoKey no puede estar vacío")
})

export const rolSchema = z.object({
    estado: z.boolean({
        required_error: "El estado es requerido",
        invalid_type_error: "El estado debe ser un booleano"
    })
})