const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('model', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
