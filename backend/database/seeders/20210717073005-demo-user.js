'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [{
            name: 'John doe',
            email: 'demo@demo.com',
            hash: '123456789',
            createdAt: new Date,
            updatedAt: new Date,
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
