import db from '../models'
import { Op } from 'sequelize'

const createSpecialty = async (inputData) => {
    try {
        if (!inputData.specialtyName || !inputData.specialtyId || !inputData.description) {
            return {
                EC: -1,
                EM: 'Missing parameter'
            }
        }
        let data = await db.Specialty.create({
            specialtyName: inputData.specialtyName,
            specialtyId: inputData.specialtyId,
            description: inputData.description,
            image: inputData.image
        })
        if (!data) {
            return {
                EC: -2,
                EM: 'Error in specialtyApiService'
            }
        }
        return {
            EC: 0,
            EM: 'Successfully created new specialty'
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -1,
            EM: 'Error in specialtyApiService'
        }
    }
}

const updateSpecialty = async (inputData) => {
    try {
        if (!inputData.specialtyName || !inputData.specialtyId || !inputData.description) {
            return {
                EC: -1,
                EM: 'Missing parameter'
            }
        }
        let data = await db.Specialty.findOne({
            where: { id: inputData.id }
        })
        if (!data) {

            return {
                EC: -1,
                EM: 'Error in specialtyApiService'
            }
        }
        data.specialtyName = inputData.specialtyName
        data.specialtyId = inputData.specialtyId
        data.description = inputData.description
        data.image = inputData.image
        await data.save()
        return {
            EC: 0,
            EM: 'Successfully updated specialty!'
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -1,
            EM: 'Error in specialtyApiService'
        }
    }
}

module.exports = {
    createSpecialty, updateSpecialty
}