export const validateSchema = (Shema) => (req, res, next) => {
    try {
        Shema.parse(req.body)
        next()
    } catch (err) {
        res.status(400).json({
            error:true,
            zodError: err
        })
    }
}

export const validateSchemaInto = (Shema, body) => {
    try {
        return Shema.parse(body)
    } catch (err) {
        return err
    }
}
