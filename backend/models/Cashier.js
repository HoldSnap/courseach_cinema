// models/cashier.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cashier extends Model {
    static associate(models) {
      Cashier.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
      Cashier.hasMany(models.Sale, {foreignKey: 'cashierId', as: 'sales'});
    }
  }
  Cashier.init(
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
        modelName: 'Cashier',
        tableName: 'Cashiers',
        timestamps: false,
      });
  return Cashier;
};
