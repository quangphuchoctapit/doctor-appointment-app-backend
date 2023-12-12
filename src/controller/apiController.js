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

module.exports = {
    signup, checkLogin
}
