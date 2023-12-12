import userService from '../service/userService'

const helloWorld = (req, res) => {
    try {
        res.render('home.ejs')
    } catch (e) {
        console.log(e)
    }
}

const getAllUsers = async (req, res) => {
    try {
        let userList = await userService.getAllUsers()
        console.log('check data; ', userList)
        return res.render('users.ejs', { userList })
    } catch (e) {
        console.log(e)
    }
}
const createNewUser = async (req, res) => {
    try {
        await userService.createNewUser(req.body)
        return res.redirect('/users')
    } catch (e) {
        console.log(e)
    }
}

const editUserInfo = async (req, res) => {
    try {
        let userData = await userService.editUserInfo(req.body)
        res.render('edit-users.ejs', { userData })
    } catch (e) {
        console.log(e)
    }
}

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id)
        return res.redirect('/users')
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    helloWorld, getAllUsers, createNewUser, editUserInfo, deleteUser
}