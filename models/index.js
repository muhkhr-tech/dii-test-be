const sequelize = require("../config/db");
const User = require("./user");

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL");

    await sequelize.sync(); // auto create table if not exists
    console.log("Tables synced");
  } catch (err) {
    console.error("DB Error:", err);
  }
};

module.exports = { sequelize, initDB, User };
