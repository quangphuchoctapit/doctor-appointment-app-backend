import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web'
require('dotenv').config()
let PORT = process.env.PORT || 8081 || 8082;


const app = express()

configViewEngine(app)

initWebRoutes(app)

app.listen(PORT, () => {
    console.log('listening on port: ', PORT)
})
