const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Menu = sequelize.define("Menu", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  tableName: "menus",
  timestamps: true,
});

module.exports = Menu;
