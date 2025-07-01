const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RoleMenuAccess = sequelize.define("RoleMenuAccess", {
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "role_menu_access",
  timestamps: false,
});

module.exports = RoleMenuAccess;
