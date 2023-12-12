
const helloWorld = (req, res) => {
    try {
        res.send('hello ok')
    } catch (e) {
        console.log(e)
    }
}

const getAllUsers = (req, res) => {
    try {
        res.send('all users')
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    helloWorld, getAllUsers
}