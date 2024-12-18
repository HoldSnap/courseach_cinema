// models/client.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      Client.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
      Client.hasMany(models.Ticket, {foreignKey: 'clientId', as: 'tickets'});
      Client.hasOne(models.Card, {foreignKey: 'clientId', as: 'card'});
    }
  }
  Client.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          // Связь с пользователем
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        balance: {
          type: DataTypes.DECIMAL(10, 2),  // Тип данных для хранения денег
          allowNull: false,
          defaultValue: 0.00,  // Начальный баланс по умолчанию
        },
        avatar: {
          type: DataTypes
                    .STRING,  // Строка для хранения URL или пути к изображению
          allowNull: true,    // Поле может быть пустым
          defaultValue: null,  // Если аватар не задан, то по умолчанию null
        },
      },
      {
        sequelize,
        modelName: 'Client',
        tableName: 'Clients',
        timestamps: false,
      });
  return Client;
};
