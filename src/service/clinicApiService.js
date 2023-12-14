import db from '../models'
import { Op } from 'sequelize'

const createClinic = async (inputData) => {
    try {
        console.log('check data in clinic service: ', inputData)
        if (!inputData.name || !inputData.location || !inputData.description) {
            return {
                EC: -1,
                EM: 'Missing parameter'
            }
        }
        let data = await db.Clinic.create({
            name: inputData.name,
            location: inputData.location,
            description: inputData.description,
            image: inputData.image
        })
        if (!data) {
            return {
                EC: -1,
                EM: 'Error in clinicApiService'
            }
        }
        return {
            EC: 0,
            EM: 'Successfully created new clinic'
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -1,
            EM: 'Error in clinicApiService'
        }
    }
}

const updateClinic = async (inputData) => {
    try {
        console.log('check data in clinic service: ', inputData)
        if (!inputData.name || !inputData.location || !inputData.description || !inputData.id) {
            return {
                EC: -1,
                EM: 'Missing parameter'
            }
        }
        let data = await db.Clinic.update({
            name: inputData.name, location: inputData.location, description: inputData.description, image: inputData.image
        }, {
            where: { id: inputData.id }
        })
        if (!data) {
            return {
                EC: -1,
                EM: 'Error in clinicApiService'
            }
        }
        return {
            EC: 0,
            EM: 'Successfully created new clinic'
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -1,
            EM: 'Error in clinicApiService'
        }
    }
}

module.exports = {
    createClinic, updateClinic
}