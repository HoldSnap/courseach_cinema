// models/session.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.belongsTo(models.Film, {foreignKey: 'filmId', as: 'film'});
      Session.belongsTo(models.Hall, {foreignKey: 'hallId', as: 'hall'});
      Session.hasMany(models.Ticket, {foreignKey: 'sessionId', as: 'tickets'});
    }
  }
  Session.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        startTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ticketPrice: {
          // Стоимость билета
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        filmId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Films',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        hallId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Halls',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
        modelName: 'Session',
        tableName: 'Sessions',
        timestamps: false,
      });
  return Session;
};
