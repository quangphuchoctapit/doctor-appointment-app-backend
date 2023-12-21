import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web'
import initApiRoutes from './routes/api'
import configCors from './configs/configCORS'

require('dotenv').config()
const bodyParser = require('body-parser')
var cookies = require("cookie-parser");


let PORT = process.env.PORT || 8081 || 8082;


const app = express()
app.use(cookies());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


configCors(app)
configViewEngine(app)

initWebRoutes(app)
initApiRoutes(app)


app.listen(PORT, () => {
    console.log('listening on port: ', PORT)
})
