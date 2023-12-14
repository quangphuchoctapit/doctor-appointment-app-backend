import express from 'express'
import apiController from '../controller/apiController'

const router = express.Router()

const initApiRoutes = (app) => {
    router.post('/signup', apiController.signup)
    router.post('/login', apiController.checkLogin)

    router.get('/get-all-doctors', apiController.getAllDoctors)
    router.get('/get-all-clinics', apiController.getAllClinics)
    router.get('/get-all-specialties', apiController.getAllSpecialties)
    router.get('/get-all-positions', apiController.getAllPositions)
    router.get('/get-all-locations', apiController.getAllLocations)
    router.get('/get-all-users', apiController.getAllUsers)
    router.post('/get-user-role', apiController.getUserRole)
    router.post('/filter-role-not-equal-to', apiController.filterRoleNotEqualTo)
    router.get('/get-all-users-filter', apiController.getAllUsersFilterByRole)

    router.post('/create-clinic', apiController.createClinic)
    router.post('/create-position', apiController.createPosition)
    router.post('/create-specialty', apiController.createSpecialty)


    router.put('/set-user-role', apiController.setUserRole)
    router.put('/update-clinic', apiController.updateClinic)



    return app.use('/api/v1', router)
}


export default initApiRoutes