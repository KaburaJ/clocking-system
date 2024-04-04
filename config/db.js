const { Sequelize } = require("sequelize");
const Card = require("../models/clocking.model");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT, 
    pool: {
      max: 10,
      min: 0,
      idle: 30000 
    },
    dialectOptions: {
      options: {
        encrypt: false 
      }
    },
  }
);

const db = {};

db.CDEDClocking = Card;

db.sequelize = sequelize;

sequelize.sync({ alter: true });

module.exports = db;
