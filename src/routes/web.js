import express from 'express'
import homeController from '../controller/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', homeController.helloWorld)
    router.get('/users', homeController.getAllUsers)
    router.get('/update-user/:id', homeController.editUserInfo)
    router.get('/delete-user/:id', homeController.deleteUser)
    router.post('/create-user', homeController.createNewUser)


    return app.use('/', router)
}


export default initWebRoutes