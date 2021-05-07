// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const User = require("./user");
const Image = require("./image");
const Place = require("./place");
const Comment = require("./comment");
const Like = require("./like");
const Reply = require("./Reply");

Place.hasMany(Image);
Image.belongsTo(Place);

Place.hasMany(Comment);
Comment.belongsTo(Place);

User.hasMany(Comment);
Comment.belongsTo(User);

Place.hasMany(Reply);
Reply.belongsTo(Place);

User.hasMany(Reply);
Reply.belongsTo(User);

Comment.hasMany(Reply);
Reply.belongsTo(Comment);

User.hasOne(Like);
Like.belongsTo(User);

Place.hasOne(Like);
Like.belongsTo(Place);

User.hasOne(Place);
Place.belongsTo(User);

module.exports = {
  User,
  Image,
  Place,
  Comment,
  Like,
  Reply,
};
