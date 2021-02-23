// Here, we can instantiate our database and use Sequelize as well;

// Module dependencies;
const Sequelize = require("sequelize");

// Confirmation message (limit these in production);
console.log("Opening database connection");

// This is our entry point, we instantiate the Sequelize instance accordingly;
const db = new Sequelize("closure", "postgres", "ACUTTzSvmN90fAJYca0q", {
  host: "closure.czrh5jkascs6.us-east-1.rds.amazonaws.com",
  port: "5432",
  logging: console.log,

  dialect: "postgres",
});

// Export our instance of Sequelize, which will be modified with models;
module.exports = db;
