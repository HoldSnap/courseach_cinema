'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      clientId: {
        // Связь с Clients
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      cardNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      pointsBalance: {
        // Баланс баллов
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      // История начислений и списаний баллов реализуется через отдельную
      // таблицу CardTransactions
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  },
};
