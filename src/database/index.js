const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Database connection
const connection = new Sequelize(dbConfig);

module.exports = connection;
