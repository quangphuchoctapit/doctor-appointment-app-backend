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
        return res.render('users.ejs')
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    helloWorld, getAllUsers, createNewUser
}