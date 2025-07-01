const bcrypt = require("bcrypt")
const { User } = require("../models");

// GET all users
exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
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

// UPDATE user
exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.update(req.body);
  res.json(user);
};

// DELETE user
exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.destroy();
  res.json({ message: "User deleted" });
};