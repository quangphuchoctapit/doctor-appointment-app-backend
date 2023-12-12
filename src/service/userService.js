import connectDB from "../configs/connectDB"
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)

const createNewUser = (data) => {
    try {
        let username = data.username
        let password = data.password
        let email = data.email
        let hashPassword = bcrypt.hashSync(password, salt)
        connectDB().query('INSERT INTO user (username, email, password) values (?, ?, ?)',
            [username, email, hashPassword])
    } catch (e) {
        console.log(e)
    }
}

const getAllUsers = async (data) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'doctor-app',
        Promise: bluebird
    })
    let user = []
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user')
        user = rows
        return user
    } catch (e) {
        console.log(e)
    }
}


module.exports = {
    createNewUser, getAllUsers
}
