'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Location extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Location.hasMany(models.Doctor_Info, { foreignKey: 'locationId', as: 'locationData' })


        }
    };
    Location.init({
        locationId: DataTypes.STRING,
        locationName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Location',
    });
    return Location;
};