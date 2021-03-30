const Sequelize = require("sequelize");
const db = require("../db");

const Like = db.define("like", {
  placeId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },

  userId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
});

module.exports = Like;
