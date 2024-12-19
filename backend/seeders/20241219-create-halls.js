// seeders/20241219-create-halls.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'Halls',
        [
          {id: 1, name: 'Main Hall', capacity: 200, hasComfortSeats: true},
          {id: 2, name: 'Small Hall', capacity: 50, hasComfortSeats: false},
          {id: 3, name: 'VIP Hall', capacity: 30, hasComfortSeats: true},
        ],
        {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Halls', null, {});
  },
};
