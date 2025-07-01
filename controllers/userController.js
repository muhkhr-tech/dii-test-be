const bcrypt = require("bcrypt")
const { User, UserRole } = require("../models");

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  res.json(user);
};

exports.createUser = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      name,
      password: hashedPassword,
      status: "active"
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name
      }
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const { username, name } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

  await user.update({
    username,
    name
  });
  res.json(user);
};


exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

  await user.destroy();
  res.json({ message: "User deleted" });
};

exports.getUserRoles = async (req, res) => {
  const userRoles = await UserRole.findAll({where: {userId: req.params.id}});
  res.json(userRoles);
};

exports.updateUserRole = async (req, res) => {
  
  try {

    const userRoles = req.body;

    const userId = userRoles[0].userId;
    
    await UserRole.destroy({ where: { userId: userId } });

    await UserRole.bulkCreate(req.body, {ignoreDuplicates: true});

    return res.status(200).json({
      message: "User role berhasil diupdate"
    });
  } catch (error) {
    console.error("Error update user role:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};