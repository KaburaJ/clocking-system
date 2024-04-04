const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Card = db.sequelize.define("Card", {
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Card_UUID: {
    type: DataTypes.STRING,
    allowNull: false,
    isUUID: 4,
  },
  First_Name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Middle_Name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Last_Name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Reg_No: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Department: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  isClockedIn: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: '',
    field: 'created_at'
  }
}, {
  tableName: 'Cards',
  timestamps: false,
});

module.exports = Card;
