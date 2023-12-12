import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web'
require('dotenv').config()
const bodyParser = require('body-parser')

let PORT = process.env.PORT || 8081 || 8082;


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app)

initWebRoutes(app)

app.listen(PORT, () => {
    console.log('listening on port: ', PORT)
})
