// models/administrator.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {
    static associate(models) {
      Administrator.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    }
  }
  Administrator.init(
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
        modelName: 'Administrator',
        tableName: 'Administrators',
        timestamps: false,
      });
  return Administrator;
};
