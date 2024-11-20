// models/user.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Client, {foreignKey: 'userId', as: 'client'});
      User.hasOne(
          models.Administrator, {foreignKey: 'userId', as: 'administrator'});
      User.hasOne(models.Cashier, {foreignKey: 'userId', as: 'cashier'});
      User.hasMany(models.Sale, {foreignKey: 'cashierId', as: 'sales'});
    }
  }
  User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('administrator', 'cashier', 'client'),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: false,
      });
  return User;
};
