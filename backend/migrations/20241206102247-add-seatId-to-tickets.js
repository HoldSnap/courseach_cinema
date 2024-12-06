'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tickets', 'seatId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Seats',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Добавление уникального индекса
    await queryInterface.addConstraint('Tickets', {
      fields: ['sessionId', 'seatId'],
      type: 'unique',
      name: 'unique_ticket_per_seat_per_session',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Tickets', 'unique_ticket_per_seat_per_session');
    await queryInterface.removeColumn('Tickets', 'seatId');
  },
};
