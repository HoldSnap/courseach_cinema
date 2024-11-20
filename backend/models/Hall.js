// models/hall.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hall extends Model {
    static associate(models) {
      Hall.hasMany(models.Session, {foreignKey: 'hallId', as: 'sessions'});
    }
  }
  Hall.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        capacity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        hasComfortSeats: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Hall',
        tableName: 'Halls',
        timestamps: false,
      });
  return Hall;
};
