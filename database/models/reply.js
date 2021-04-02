const Sequelize = require("sequelize");
const db = require("../db");

const Reply = db.define("comment", {
  content: {
    type: Sequelize.STRING(400),
    allowNull: false,
  },

  placeId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },

  userId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },

  commentId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
});

module.exports = Reply;
