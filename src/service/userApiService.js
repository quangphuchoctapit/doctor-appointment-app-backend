import db from '../models'
import bcrypt from 'bcryptjs'
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
    console.log('check exist: ', isExistedEmail)
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
        return {
            EC: 0,
            EM: 'Successfully Logged In.'
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

module.exports = {
    signup, checkLogin
}