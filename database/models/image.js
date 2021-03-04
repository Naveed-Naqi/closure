const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define("image", {
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  placeId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
});

module.exports = Image;
