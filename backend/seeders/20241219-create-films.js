'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'Films',
        [
          {
            id: 1,
            title: 'The Great Adventure',
            duration: 120,
            genre: 'Action',
            premiereDate: new Date('2024-01-15'),
            pointUsageRestriction: false,
          },
          {
            id: 2,
            title: 'Comedy Nights',
            duration: 90,
            genre: 'Comedy',
            premiereDate: new Date('2024-02-01'),
            pointUsageRestriction: false,
          },
          {
            id: 3,
            title: 'Animated World',
            duration: 80,
            genre: 'Animation',
            premiereDate: new Date('2024-03-10'),
            pointUsageRestriction: true,
          },
        ],
        {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Films', null, {});
  },
};
