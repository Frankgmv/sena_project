
const manejadorErrores = (err, req, res, next) => {
    console.error(err)
    res.status(500).json({
        error:true,
        status: 500,
        message: err.message
    })
}

export default manejadorErrores
