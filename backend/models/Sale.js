// models/sale.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    static associate(models) {
      Sale.belongsTo(models.User, {foreignKey: 'cashierId', as: 'cashier'});
      Sale.belongsTo(models.Ticket, {foreignKey: 'ticketId', as: 'ticket'});
    }
  }
  Sale.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        cashierId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        ticketId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Tickets',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        saleDateTime: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        paymentMethod: {
          type: DataTypes.ENUM('cash', 'card', 'points'),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Sale',
        tableName: 'Sales',
        timestamps: false,
      });
  return Sale;
};
