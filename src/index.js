import { config } from 'dotenv'
import app from './app.js'
import { connect } from './conection.js'
import 'colors'

config()

const PORT =  process.env.PORT || 6000

connect()

app.listen(PORT, () => console.log(`  << aplicacion running on port ${PORT} >>  `.yellow))
