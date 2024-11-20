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
      },
      {
        sequelize,
        modelName: 'Client',
        tableName: 'Clients',
        timestamps: false,
      });
  return Client;
};