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
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Place;
