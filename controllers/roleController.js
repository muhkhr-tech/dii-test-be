const { Role } = require("../models");

exports.getRole = async (req, res) => {
  const role = await Role.findAll();
  res.json(role);
};


exports.createRole = async (req, res) => {
  try {

    await Role.create(req.body)

    return res.status(201).json({
      message: "Role berhasil ditambah",
    });

  } catch (error) {
    console.error("Role gagal ditambah:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
