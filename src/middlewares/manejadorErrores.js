const manejadorErrores = (err, req, res, next) => {
    const message = err.message || err
    res.status(500).json({
        error:true,
        status: 500,
        message
    })
}

export default manejadorErrores
