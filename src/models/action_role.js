'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Action_Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Action_Role.init({
        roleId: DataTypes.INTEGER,
        actionId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Action_Role',
    });
    return Action_Role;
};