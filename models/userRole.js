const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserRole = sequelize.define("UserRole", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: "user_roles",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'roleId']
    }
  ]
});

module.exports = UserRole;
