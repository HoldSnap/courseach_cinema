// models/cardTransaction.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CardTransaction extends Model {
    static associate(models) {
      CardTransaction.belongsTo(
          models.Card, {foreignKey: 'cardId', as: 'card'});
    }
  }
  CardTransaction.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        cardId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Cards',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        type: {
          // Тип транзакции: начисление или списание
          type: DataTypes.ENUM('credit', 'debit'),
          allowNull: false,
        },
        points: {
          // Количество баллов
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        transactionDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        description: {
          // Описание транзакции
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'CardTransaction',
        tableName: 'CardTransactions',
        timestamps: false,
      });
  return CardTransaction;
};
