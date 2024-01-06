import express from 'express'
import apiController from '../controller/apiController'
import { checkUserJWT } from '../middleware/JWTActions'

const router = express.Router()

const initApiRoutes = (app) => {
    // router.all('*', checkUserJWT)

    router.post('/signup', apiController.signup)
    router.post('/login', apiController.checkLogin)

    router.get('/get-all-doctors', apiController.getAllDoctors)
    router.get('/get-all-clinics', apiController.getAllClinics)
    router.get('/get-all-specialties', apiController.getAllSpecialties)
    router.get('/get-all-positions', apiController.getAllPositions)
    router.get('/get-all-locations', apiController.getAllLocations)
    router.get('/get-all-schedule', apiController.getAllSchedule)

    router.get('/get-all-users', apiController.getAllUsers)
    router.post('/get-user-role', apiController.getUserRole)
    router.post('/filter-role-not-equal-to', apiController.filterRoleNotEqualTo)
    router.get('/get-all-users-filter', apiController.getAllUsersFilterByRole)
    router.get('/get-all-doctor-positions', apiController.getAllDoctorPositions)
    router.post('/get-doctor-info', apiController.getDoctorInfo)


    router.post('/create-clinic', apiController.createClinic)
    router.post('/create-position', apiController.createPosition)
    router.post('/create-specialty', apiController.createSpecialty)
    router.post('/create-doctor-info', apiController.createDoctorInfo)



    router.put('/set-user-role', apiController.setUserRole)
    router.put('/update-clinic', apiController.updateClinic)
    router.put('/update-specialty', apiController.updateSpecialty)
    router.put('/update-doctor-info', apiController.updateDoctorInfo)

    router.put('/user/edit-img', apiController.editUserImage)


    return app.use('/api/v1', router)
}


export default initApiRoutes