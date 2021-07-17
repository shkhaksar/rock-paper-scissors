'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        hash: {type: DataTypes.STRING, allowNull: false},
        wins: {type: DataTypes.BIGINT, defaultValue: 0},
        losses: {type: DataTypes.BIGINT, defaultValue: 0}
    }, {
        sequelize,
        modelName: 'User',
        defaultScope: {
            // exclude hash by default
            attributes: {exclude: ['hash']}
        },
        scopes: {
            // include hash with this scope
            withHash: {attributes: {}}
        }
    });
    return User;
};