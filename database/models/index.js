// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const User = require("./user");
const Image = require("./image");
const Place = require("./place");

Place.hasMany(Image);
Image.belongsTo(Place);

module.exports = {
  User,
  Image,
  Place,
};
