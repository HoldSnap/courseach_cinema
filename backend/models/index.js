'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Прямо вставляем значения из Docker Compose
  sequelize = new Sequelize(
      'mydatabase',  // DB_NAME из Docker Compose
      'user1',       // DB_USER из Docker Compose
      'password1',   // DB_PASS из Docker Compose
      {
        host: 'mysql',  // DB_HOST из Docker Compose (имя сервиса MySQL в Docker
                        // Compose)
        dialect: 'mysql',  // Драйвер MySQL
        port: 3306         // DB_PORT из Docker Compose (порт MySQL)
      });
}

fs.readdirSync(__dirname)
    .filter(file => {
      return (
          file.indexOf('.') !== 0 && file !== basename &&
          file.slice(-3) === '.js' && file.indexOf('.test.js') === -1);
    })
    .forEach(file => {
      const model =
          require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
