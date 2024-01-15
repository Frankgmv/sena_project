export const validateSchema = (Shema) => (req, res, next) => {
    try {
        Shema.parse(req.body)
        next()
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
}

export const  validateSchemaInto = (Shema, body)  => {
    try {
        Shema.parse(body)
        return { ok:true }
    } catch (err) {
        return err
    }
}

