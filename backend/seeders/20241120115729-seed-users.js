'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        login: 'admin',
        password: 'admin',
        role: 'administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'cashier1',
        password: 'hashed_password',
        role: 'cashier',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'client1',
        password: 'hashed_password',
        role: 'client',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
