'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Schedule.hasMany(models.Doctor_Info, { foreignKey: 'availableTime', as: 'scheduleData' })

        }
    };
    Schedule.init({
        scheduleId: DataTypes.STRING,
        scheduleName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};