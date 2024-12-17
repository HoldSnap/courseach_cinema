// models/seat.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      Seat.belongsTo(models.Session, {foreignKey: 'sessionId', as: 'session'});
      Seat.hasMany(models.Ticket, {foreignKey: 'seatId', as: 'tickets'});
    }
  }

  Seat.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isAvailable: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,  // Место по умолчанию доступно
        },
        sessionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Sessions',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
        modelName: 'Seat',
        tableName: 'Seats',
        timestamps: false,
      });

  return Seat;
};
