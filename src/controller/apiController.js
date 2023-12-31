import userApiService from '../service/userApiService'
import clinicApiService from '../service/clinicApiService.js'
import specialtyApiService from '../service/specialtyApiService'
import doctorApiService from '../service/doctorApiService'
require('dotenv').config()

const signup = async (req, res) => {
    try {
        let data = await userApiService.signup(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'Error from apiController'
        })
    }
}

const checkLogin = async (req, res) => {
    try {
        let data = await userApiService.checkLogin(req.body)
        if (data && data.DT && data.DT.access_token) {
            console.log('lot vao nek r do')
            res.cookie('jwt', data.DT.access_token, { httpOnly: true })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'Error from apiController'
        })
    }
}

const getAllDoctors = async (req, res) => {
    try {
        let data = await userApiService.getAllDoctors()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const getAllClinics = async (req, res) => {
    try {
        let data = await userApiService.getAllClinics()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const getAllSpecialties = async (req, res) => {
    try {
        let data = await userApiService.getAllSpecialties()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const getAllPositions = async (req, res) => {
    try {
        let data = await userApiService.getAllPositions()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const getAllLocations = async (req, res) => {
    try {
        let data = await userApiService.getAllLocations()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}


const getAllSchedule = async (req, res) => {
    try {
        let data = await doctorApiService.getAllSchedule()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        let data = await userApiService.getAllUsers()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const getUserRole = async (req, res) => {
    try {
        let data = await userApiService.getUserRole(req.body.roleId)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const filterRoleNotEqualTo = async (req, res) => {
    try {
        let data = await userApiService.filterRoleNotEqualTo(req.body.roleId)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const setUserRole = async (req, res) => {
    try {
        let data = await userApiService.setUserRole(req.body.id, req.body.selectedRole)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const getAllUsersFilterByRole = async (req, res) => {
    try {
        let data = await userApiService.getAllUsersFilterByRole(req.body.role)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const createClinic = async (req, res) => {
    try {
        let data = await clinicApiService.createClinic(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const createSpecialty = async (req, res) => {
    try {
        let data = await specialtyApiService.createSpecialty(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const createPosition = async (req, res) => {
    try {
        let data = await userApiService.createClinic(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const updateClinic = async (req, res) => {
    try {
        let data = await clinicApiService.updateClinic(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const updateSpecialty = async (req, res) => {
    try {
        let data = await specialtyApiService.updateSpecialty(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const getAllDoctorPositions = async (req, res) => {
    try {
        let data = await doctorApiService.getAllDoctorPositions()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const createDoctorInfo = async (req, res) => {
    try {
        let data = await doctorApiService.createDoctorInfo(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const updateDoctorInfo = async (req, res) => {
    try {
        let data = await doctorApiService.updateDoctorInfo()
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'error from apiController'
        })
    }
}

const getDoctorInfo = async (req, res) => {
    try {
        let data = await doctorApiService.getDoctorInfo(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'Error from apiController'
        })
    }
}

const editUserImage = async (req, res) => {
    try {
        let data = await userApiService.editUserImage(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            EM: 'Error from apiController'
        })
    }
}

module.exports = {
    signup, checkLogin, getAllDoctors, getAllClinics,
    getAllSpecialties, getAllLocations, getAllSchedule, getAllPositions,
    getAllUsers, getUserRole, filterRoleNotEqualTo,
    setUserRole, getAllUsersFilterByRole, createClinic,
    createPosition, createSpecialty, updateClinic,
    updateSpecialty, getAllDoctorPositions, createDoctorInfo, updateDoctorInfo,
    getDoctorInfo, editUserImage
}
