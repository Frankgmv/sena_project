const manejadorErrores = (err, req, res, next) => {
    res.status(500).json({
        error:true,
        status: 500,
        message: err.message
    })
}

export default manejadorErrores
