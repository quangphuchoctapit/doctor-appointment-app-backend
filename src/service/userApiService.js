import db from '../models'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
import { getRoleWithActions } from './JWTService'
import { createJWT } from '../middleware/JWTActions'
require('dotenv').config()

const salt = bcrypt.genSaltSync(10)

const checkHashPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}

const checkExistedEmail = async (email) => {
    let user = await db.User.findOne({
        where: { email }
    })
    if (user) {
        return true
    }
    return false
}


const signup = async (data) => {
    if (!data.username || !data.email || !data.password) {
        return {
            EC: -1,
            EM: 'Please enter all fields'
        }
    }
    let isExistedEmail = await checkExistedEmail(data.email)
    if (isExistedEmail === true) {
        return {
            EC: -2,
            EM: 'This email already exists, please try another email address'
        }
    }
    let username = data.username
    let email = data.email
    let password = data.password
    if (password && password.length < 4) {
        return {
            EC: -3,
            EM: 'Password must be at least 4 characters'
        }
    }
    let hashPassword = bcrypt.hashSync(password, salt)
    let createUser = await db.User.create({
        username,
        password: hashPassword,
        email
    })
    if (!createUser) {
        return {
            EC: -1,
            EM: 'Error cannot create user'
        }
    }
    return {
        EC: 0,
        EM: 'Successfully created user'
    }
}

const checkLogin = async (data) => {
    if (!data.email || !data.password) {
        return {
            EC: -1,
            EM: 'Please enter all fields'
        }
    }
    let isExistedEmail = checkExistedEmail(data.email)
    if (!isExistedEmail) {
        return {
            EC: -2,
            EM: 'Email not found. Please try again'
        }
    }
    let user = await db.User.findOne({
        where: {
            email: data.email
        }
    })
    if (!user) {
        return {
            EC: -3,
            EM: 'User not found.'
        }
    }
    let checkPassword = checkHashPassword(data.password, user.password)
    if (checkPassword) {
        // console.log('check user: ', user)
        let roleWithActions = await getRoleWithActions(user)
        let payload = {
            email: user.email,
            roleWithActions: roleWithActions,
            expiresIn: process.env.JWT_EXPIRESIN
        }
        let token = await createJWT(payload)
        return {
            EC: 0,
            EM: 'Successfully Logged In.',
            DT: {
                access_token: token,
                roleWithActions: roleWithActions,
                email: user.email,
                username: user.username
            }
        }
    }
    if (!checkPassword) {
        return {
            EC: -4,
            EM: 'Incorrect Password.'
        }
    }
    return {
        EC: -5,
        EM: 'Error from server.'
    }
}
const getAllDoctors = async () => {
    let doctorList = []
    let data = await db.User.findAll({
        where: { roleId: 'D' },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'RoleId'] },
        include: {
            model: db.Doctor_Info, as: 'doctorData', attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                { model: db.Specialty, attributes: ['specialtyId', 'specialtyName'], as: 'specialtyData' },
                { model: db.Position, attributes: ['positionId', 'positionName'], as: 'positionData' },
                { model: db.Location, attributes: ['locationId', 'locationName'], as: 'locationData' },
                { model: db.Clinic, attributes: ['name'], as: 'clinicData' },
            ]
        }
    })
    if (data) {
        doctorList = data
        return {
            EC: 0,
            EM: 'Susccesfully Get All Doctors',
            DT: doctorList
        }
    }
    return {
        EC: -1,
        EM: 'Cannot get doctors',
        DT: doctorList
    }
}

const getAllClinics = async () => {
    let clinicList = []
    let data = await db.Clinic.findAll({
        include: { model: db.Location, attributes: ['locationName'], as: 'clinicLocationData' }
    })
    if (data) {
        clinicList = data
        return {
            EC: 0,
            EM: 'Susccesfully Get All clinics',
            DT: clinicList
        }
    }
    return {
        EC: -1,
        EM: 'Cannot get clinics',
        DT: clinicList
    }
}

const getAllSpecialties = async () => {
    let specialtyList = []
    let data = await db.Specialty.findAll()
    if (data) {
        specialtyList = data
        return {
            EC: 0,
            EM: 'Susccesfully Get All Specialties',
            DT: specialtyList
        }
    }
    return {
        EC: -1,
        EM: 'Cannot get Specialties',
        DT: specialtyList
    }
}

const getAllPositions = async () => {
    let positionList = []
    let data = await db.Specialty.findAll({

    })
    if (data) {
        positionList = data
        return {
            EC: 0,
            EM: 'Susccesfully Get All Positions',
            DT: positionList
        }
    }
    return {
        EC: -1,
        EM: 'Cannot get Positions',
        DT: positionList
    }
}

const getAllLocations = async () => {
    let locationList = []
    let data = await db.Location.findAll()
    if (data) {
        locationList = data
        return {
            EC: 0,
            EM: 'Susccesfully Get All Locations',
            DT: locationList
        }
    }
    return {
        EC: -1,
        EM: 'Cannot get Locations',
        DT: locationList
    }
}

const getUserRole = async (data) => {
    try {
        let role = await db.Role.findOne({
            where: { roleId: data }
        })
        if (role) {
            return {
                EC: 0,
                EM: 'get data',
                DT: role
            }
        }
        return {
            EC: -1,
            EM: 'Cannot get role data',
            DT: {}
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -2,
            EM: 'Error from userAPIService'
        }
    }
}

const getAllUsers = async () => {
    try {
        let users = []
        let listUser = await db.User.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'RoleId'] },
            include: { model: db.Role, attributes: ['roleId', 'roleName'], as: 'roleData' }
        })

        if (!listUser) return {
            EC: -1,
            EM: 'Cannot find users',
            listUser: users
        }
        users = [...listUser]
        return {
            EC: 0,
            EM: 'Successfully get all userss',
            DT: users
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -2,
            EM: 'Error from userAPIService'
        }
    }
}

const filterRoleNotEqualTo = async (roleId) => {
    try {
        let userData = []
        if (!roleId) {
            return {
                EC: -4,
                EM: `Missing parameter roleID`,
                DT: userData
            }
        }
        let data = await db.User.findAll({
            where: { roleId: { [Op.ne]: roleId } },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'RoleId'] },
            include: { model: db.Role, attributes: ['roleId', 'roleName'], as: 'roleData' }
        })
        if (data) {
            userData = data
            return {
                EC: 0,
                EM: `Susccesfully Get All Users that are not ${roleId}`,
                DT: userData
            }
        }
        return {
            EC: -1,
            EM: `Cannot get user that are not ${roleId}`,
            DT: userData
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -2,
            EM: 'Error in userApiService',
            DT: []
        }
    }
}

const setUserRole = async (userId, selectedRole) => {
    try {
        if (!userId || !selectedRole) return {
            EC: -3,
            EM: 'Missing parameter'
        }
        let data = await db.User.findOne({
            where: { id: userId }
        })
        if (!data) {
            return {
                EC: -1,
                EM: 'Cannot find user'
            }
        }
        data.set({
            roleId: selectedRole
        });
        let finalData = await data.save()
        if (finalData) {
            return {
                EC: 0,
                EM: 'Successfully updated this user role'
            }
        }
        return {
            EC: -2,
            EM: 'Error when updating this user role'
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -2,
            EM: 'Error in userApiService',
            DT: doctorList
        }
    }
}

const getAllUsersFilterByRole = async (roleId) => {
    try {
        let userList = []
        let data = await db.User.findAll({
            where: {
                roleId: roleId
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'RoleId'] }
        })
        if (data) {
            userList = data
            return {
                EC: 0,
                EM: `successfully get users by ${roleId} role`,
                DT: userList
            }
        }
        return {
            EC: -1,
            EM: 'Cannot get users',
            DT: userList
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -2,
            EM: 'Error in userApiService',
            DT: userList
        }
    }
}



module.exports = {
    signup, checkLogin, getAllDoctors, getAllClinics,
    getAllSpecialties, getAllPositions, getAllLocations,
    getAllUsers, getUserRole, filterRoleNotEqualTo,
    setUserRole, getAllUsersFilterByRole
}