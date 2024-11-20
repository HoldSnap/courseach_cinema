'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CardTransactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cardId: {
        // Связь с Cards
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cards',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      type: {
        // Тип транзакции: credit или debit
        type: Sequelize.ENUM('credit', 'debit'),
        allowNull: false,
      },
      points: {
        // Количество баллов
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transactionDate: {
        // Дата транзакции
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      description: {
        // Описание транзакции
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CardTransactions');
  },
};
