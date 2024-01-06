'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Doctor_Info.hasOne(models.User, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorData' })
            Doctor_Info.belongsTo(models.Specialty, { foreignKey: 'specialtyId', targetKey: 'specialtyId', as: 'specialtyData' })
            Doctor_Info.belongsTo(models.Position, { foreignKey: 'positionId', targetKey: 'positionId', as: 'positionData' })
            Doctor_Info.belongsTo(models.Location, { foreignKey: 'locationId', targetKey: 'locationId', as: 'locationData' })
            Doctor_Info.belongsTo(models.Clinic, { foreignKey: 'clinicId', targetKey: 'id', as: 'clinicData' })
            Doctor_Info.belongsTo(models.Schedule, { foreignKey: 'availableTime', targetKey: 'id', as: 'scheduleData' })

        }
    };
    Doctor_Info.init({
        doctorId: DataTypes.STRING,
        clinicId: DataTypes.STRING,
        positionId: DataTypes.STRING,
        locationId: DataTypes.STRING,
        specialtyId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        description: DataTypes.STRING,
        availableTime: DataTypes.JSON,
    }, {
        sequelize,
        modelName: 'Doctor_Info',
    });
    return Doctor_Info;
};