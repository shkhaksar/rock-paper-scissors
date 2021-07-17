'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER, allowNull: false,
                autoIncrement: true, primaryKey: true,
            },
            name: {type: Sequelize.STRING, allowNull: false},
            email: {type: Sequelize.STRING, allowNull: false},
            hash: {type: Sequelize.STRING, allowNull: false},
            wins: {type: Sequelize.BIGINT, defaultValue: 0},
            losses: {type: Sequelize.BIGINT, defaultValue: 0},
            createdAt: {allowNull: false, type: Sequelize.DATE},
            updatedAt: {allowNull: false, type: Sequelize.DATE}
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};