import userApiService from '../service/userApiService'

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
        let data = await userApiService.getUserRole(req.body)
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

const getAllNotDoctors = async (req, res) => {
    try {
        let data = await userApiService.getAllNotDoctors()
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

const getAllUsersFilter = async (req, res) => {
    try {
        let data = await userApiService.getAllUsersFilter(req.body.role)
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

module.exports = {
    signup, checkLogin, getAllDoctors, getAllUsers, getUserRole, getAllNotDoctors,
    setUserRole, getAllUsersFilter
}
