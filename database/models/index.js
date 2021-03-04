// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const User = require("./user");
const Image = require("./image");
const Place = require("./place");
const Comment = require("./comment");

Place.hasMany(Image);
Image.belongsTo(Place);

Place.hasMany(Comment);
Comment.belongsTo(Place);

Comment.hasOne(User);
User.belongsTo(Comment);

module.exports = {
  User,
  Image,
  Place,
  Comment,
};
