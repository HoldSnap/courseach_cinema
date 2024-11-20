// models/card.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      Card.belongsTo(models.Client, {foreignKey: 'clientId', as: 'client'});
      // История начислений и списаний баллов может быть реализована через
      // отдельную модель, например, CardTransaction
    }
  }
  Card.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        clientId: {
          // Связь с клиентом
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        cardNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        pointsBalance: {
          // Баланс баллов
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        // История начислений и списаний баллов может быть реализована через
        // отдельную модель
      },
      {
        sequelize,
        modelName: 'Card',
        tableName: 'Cards',
        timestamps: false,
      });
  return Card;
};
