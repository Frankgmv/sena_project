const validateSchema = (Shema) => (req, res, next) => {
    try {
        Shema.parse(req.body);
        next();
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
}

export default validateSchema;