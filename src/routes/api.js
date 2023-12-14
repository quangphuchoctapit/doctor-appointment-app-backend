import express from 'express'
import apiController from '../controller/apiController'

const router = express.Router()

const initApiRoutes = (app) => {
    router.post('/signup', apiController.signup)
    router.post('/login', apiController.checkLogin)
    router.get('/get-all-doctors', apiController.getAllDoctors)
    router.get('/get-all-users', apiController.getAllUsers)
    router.post('/get-user-role', apiController.getUserRole)
    router.post('/filter-role-not-equal-to', apiController.filterRoleNotEqualTo)
    router.put('/set-user-role', apiController.setUserRole)
    router.get('/get-all-users-filter', apiController.getAllUsersFilter)






    return app.use('/api/v1', router)
}


export default initApiRoutes