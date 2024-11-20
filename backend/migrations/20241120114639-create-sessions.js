'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ticketPrice: {
        // Стоимость билета
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      filmId: {
        // Связь с Films
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Films',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      hallId: {
        // Связь с Halls
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Halls',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  },
};
