import express from 'express'
import homeController from '../controller/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', homeController.helloWorld)
    router.get('/users', homeController.getAllUsers)

    return app.use('/', router)
}


export default initWebRoutes