const { Menu } = require("../models");

exports.getMenu = async (req, res) => {
  const menu = await Menu.findAll();
  res.json(menu);
};

exports.createMenu = async (req, res) => {
  try {

    await Menu.bulkCreate(req.body)

    return res.status(201).json({
      message: "Menu berhasil ditambah",
    });

  } catch (error) {
    console.error("Role gagal ditambah:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};