const { Menu } = require("../models");

exports.getMenu = async (req, res) => {
  const menu = await Menu.findAll();
  res.json(menu);
};