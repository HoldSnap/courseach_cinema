// models/ticket.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(
          models.Session, {foreignKey: 'sessionId', as: 'session'});
      Ticket.belongsTo(models.Client, {foreignKey: 'clientId', as: 'client'});
      Ticket.belongsTo(models.Seat, {foreignKey: 'seatId', as: 'seat'});
      Ticket.hasOne(models.Sale, {foreignKey: 'ticketId', as: 'sale'});
    }
  }
  Ticket.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        purchaseDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
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
        clientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        seatId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Seats',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        reservationStatus: {
          type: DataTypes.ENUM('reserved', 'paid'),
          allowNull: false,
          defaultValue: 'reserved',
        },
      },
      {
        sequelize,
        modelName: 'Ticket',
        tableName: 'Tickets',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['sessionId', 'seatId'],
            name: 'unique_ticket_per_seat_per_session',
          },
        ],
      });
  return Ticket;
};
