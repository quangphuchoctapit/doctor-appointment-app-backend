const mysql = require('mysql2')

const connectDB = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'doctor-app',
        password: ''
    })
}
export default connectDB