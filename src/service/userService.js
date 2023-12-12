import connectDB from "../configs/connectDB"
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import bcrypt from 'bcryptjs'
import db from '../models'

const salt = bcrypt.genSaltSync(10)

const createNewUser = async (data) => {
    try {
        let username = data.username
        let password = data.password
        let email = data.email
        let hashPassword = bcrypt.hashSync(password, salt)
        await db.User.create({
            username,
            password: hashPassword,
            email
        })
    } catch (e) {
        console.log(e)
    }
}

const getAllUsers = async (data) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'doctor-app',
    //     Promise: bluebird
    // })
    // let user = []
    try {
        // const [rows, fields] = await connection.execute('SELECT * FROM user')
        // user = rows
        // return user

        let users = await db.User.findAll()
        return users
    } catch (e) {
        console.log(e)
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: { id: id }
        })
    } catch (e) {
        console.log(e)
    }
}

const editUserInfo = async (data) => {
    try {
        await db.User.update(
            { email: data.email, username: data.username },
            {
                where: {
                    id: data.id
                }
            }
        )
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    createNewUser, getAllUsers, deleteUser, editUserInfo
}
