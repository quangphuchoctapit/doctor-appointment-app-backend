import db from '../models'
import { Op } from 'sequelize'

const getAllDoctorPositions = async () => {
    try {
        let positionData = []
        let data = await db.Position.findAll()
        if (data) {
            positionData = data
            return {
                EC: 0,
                EM: 'Successfully get all doctor positions',
                DT: positionData
            }
        }
        return {
            EC: -1,
            EM: 'Cannot get doctor positions',
            DT: positionData
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -1,
            EM: 'Error in doctorApiService'
        }
    }
}

const createDoctorInfo = async (dataInput) => {
    try {
        if (!dataInput.doctorId || !dataInput.clinicId ||
            !dataInput.locationId || !dataInput.specialtyId
            || !dataInput.positionId || !dataInput.description) {
            return {
                EC: -1,
                EM: 'Missing parameter'
            }
        }
        let doctorData = []
        let { doctorId, clinicId, locationId, specialtyId, positionId, description } = dataInput
        let isExistedData = await db.Doctor_Info.findAll({
            where: {
                doctorId: doctorId
            }
        })
        console.log('cehck isexisted data : ', isExistedData)
        if (isExistedData.length > 0) {
            let data = await db.Doctor_Info.update({
                clinicId, locationId, positionId, specialtyId, description
            }, {
                where: {
                    doctorId: doctorId
                }
            })
            doctorData = data
            if (data) {
                return {
                    EC: 0,
                    EM: 'Successfully create new doctor information',
                    DT: doctorData
                }
            }
            return {
                EC: -2,
                EM: 'Cannot update existing doctor information',
                DT: doctorData
            }
        } else {
            let data = await db.Doctor_Info.create({
                doctorId, clinicId, locationId, positionId, specialtyId, description
            })
            if (data) {
                doctorData = data
                return {
                    EC: 0,
                    EM: 'Successfully create new doctor information',
                    DT: doctorData
                }
            }
        }
        return {
            EC: -3,
            EM: 'Cannot create doctor data',
            DT: doctorData
        }



    } catch (e) {
        console.log(e)
        return {
            EC: -4,
            EM: 'Error in doctorApiService'
        }
    }
}

const updateDoctorInfo = async (dataInput) => {
    try {
        let { doctorId, clinicId, locationId, specialtyId, positionId, description } = dataInput
        let data = await db.Doctor_Info.findOne({
            where: {
                doctorId: doctorId
            }
        })

        if (data) {
            let updatedData = await db.Doctor_Info.update({
                clinicId, locationId, specialtyId, positionId, description
            })
            if (updatedData) {

                return {
                    EC: 0,
                    EM: 'Successfully update Doctor Information'
                }
            }
            return {
                EC: -2,
                EM: 'Cannot update doctor Doctor Information'
            }
        }
        return {
            EC: -3,
            EM: 'Cannot update positions'
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -4,
            EM: 'Error in doctorApiService'
        }
    }
}

module.exports = {
    getAllDoctorPositions, createDoctorInfo, updateDoctorInfo
}