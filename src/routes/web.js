import express from 'express'
import homeController from '../controller/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', homeController.helloWorld)
    router.get('/users', homeController.getAllUsers)
    router.post('/create-user', homeController.createNewUser)


    return app.use('/', router)
}


export default initWebRoutes