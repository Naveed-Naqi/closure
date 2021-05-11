const Sequelize = require("sequelize");
const db = require("../db");

const Place = db.define("place", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  summary: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },

  userId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
    allowNull: true,
  },
});

module.exports = Place;
