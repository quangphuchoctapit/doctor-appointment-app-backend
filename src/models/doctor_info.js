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


        }
    };
    Doctor_Info.init({
        doctorId: DataTypes.STRING,
        clinicId: DataTypes.STRING,
        positionId: DataTypes.STRING,
        locationId: DataTypes.STRING,
        specialtyId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Doctor_Info',
    });
    return Doctor_Info;
};