// models/seat.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      Seat.belongsTo(models.Hall, {foreignKey: 'hallId', as: 'hall'});
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
        row: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isAvailable: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,  // Место по умолчанию доступно
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
        modelName: 'Seat',
        tableName: 'Seats',
        timestamps: false,
      });

  return Seat;
};
