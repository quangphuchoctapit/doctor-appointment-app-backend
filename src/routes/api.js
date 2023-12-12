import express from 'express'
import apiController from '../controller/apiController'

const router = express.Router()

const initApiRoutes = (app) => {
    router.post('/signup', apiController.signup)
    router.post('/login', apiController.checkLogin)


    return app.use('/api/v1', router)
}


export default initApiRoutes