// models/film.js
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    static associate(models) {
      Film.hasMany(models.Session, {foreignKey: 'filmId', as: 'sessions'});
    }
  }
  Film.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        duration: {
          // Длительность фильма в минутах
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        genre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        premiereDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        pointUsageRestriction: {
          // Ограничения на использование баллов во время премьеры
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Film',
        tableName: 'Films',
        timestamps: false,
      });
  return Film;
};
