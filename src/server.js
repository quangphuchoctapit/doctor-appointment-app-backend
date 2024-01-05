import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web'
import initApiRoutes from './routes/api'
const cors = require('cors');

require('dotenv').config()
const bodyParser = require('body-parser')
var cookies = require("cookie-parser");


let PORT = process.env.PORT || 8081 || 8082;


const app = express()
app.use(cookies());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))


// configCors(app)
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
configViewEngine(app)

initWebRoutes(app)
initApiRoutes(app)


app.listen(PORT, () => {
    console.log('listening on port: ', PORT)
})
