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
            || !dataInput.positionId || !dataInput.description || !dataInput.availableTime) {
            return {
                EC: -1,
                EM: 'Missing parameter'
            }
        }
        let doctorData = []
        let { doctorId, clinicId, locationId, specialtyId, positionId, description, availableTime } = dataInput
        let isExistedData = await db.Doctor_Info.findAll({
            where: {
                doctorId: doctorId
            }
        })
        console.log('cehck isexisted data : ', isExistedData)
        if (isExistedData.length > 0) {
            let data = await db.Doctor_Info.update({
                clinicId, locationId, positionId, specialtyId, description, availableTime
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
                doctorId, clinicId, locationId, positionId, specialtyId, description, availableTime
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
        let { doctorId, clinicId, locationId, specialtyId, positionId, description, availableTime } = dataInput
        let data = await db.Doctor_Info.findOne({
            where: {
                doctorId: doctorId
            }
        })

        if (data) {
            let updatedData = await db.Doctor_Info.update({
                clinicId, locationId, specialtyId, positionId, description, availableTime
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

const expandedGetDoctorInfo = async (doctorId) => {
    try {
        let expandedDoctorData = await db.User.findOne({
            where: {
                id: doctorId
            }
        })
        return expandedDoctorData.get({ plain: true })
    } catch (e) {
        console.log(e)
    }
}

const getDoctorInfo = async (dataInput) => {
    try {
        if (!dataInput.id) {
            return {
                EC: -3,
                EM: 'Missing id',
                DT: ''
            }
        }
        let expandedDoctorData = await expandedGetDoctorInfo(dataInput.id)
        let { username, image } = expandedDoctorData
        // console.log('datainput.id', dataInput.id)
        let data = await db.Doctor_Info.findOne({
            where: {
                doctorId: dataInput.id
            },
            include: [
                { model: db.Specialty, attributes: ['specialtyId', 'specialtyName'], as: 'specialtyData' },
                { model: db.Position, attributes: ['positionId', 'positionName'], as: 'positionData' },
                { model: db.Location, attributes: ['locationId', 'locationName'], as: 'locationData' },
                { model: db.Clinic, attributes: ['name'], as: 'clinicData' },
            ]
        })
        if (data) {
            data = data.get({ plain: true })

            return {
                EC: 0,
                EM: 'Successfully get all doctor information',
                DT: { ...data, username, image }
            }
        }
        return {
            EC: -2,
            EM: 'Cannot get doctor information',
            DT: data
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -1,
            EM: 'Error in doctorApiService'
        }
    }
}

const getAllSchedule = async () => {
    try {
        let schedule = await db.Schedule.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        if (schedule) {
            return {
                EC: 0,
                EM: 'ok get all schedules',
                DT: schedule
            }
        }
        return {
            EC: -2,
            EM: 'cannot get schedule',
            DT: []
        }
    } catch (e) {
        console.log(e)
        return {
            EC: -1,
            EM: 'Error in doctorApiService'
        }
    }
}

module.exports = {
    getAllDoctorPositions, createDoctorInfo, updateDoctorInfo,
    getDoctorInfo, getAllSchedule
}