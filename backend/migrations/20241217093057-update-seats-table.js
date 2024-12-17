'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Удаление столбца 'row'
    await queryInterface.removeColumn('Seats', 'row');

    // Добавление столбца 'sessionId'
    await queryInterface.addColumn('Seats', 'sessionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Sessions',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Удаление столбца 'hallId'
    await queryInterface.removeColumn('Seats', 'hallId');
  },

  down: async (queryInterface, Sequelize) => {
    // Восстановление столбца 'hallId'
    await queryInterface.addColumn('Seats', 'hallId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Halls',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Удаление столбца 'sessionId'
    await queryInterface.removeColumn('Seats', 'sessionId');

    // Восстановление столбца 'row'
    await queryInterface.addColumn('Seats', 'row', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
