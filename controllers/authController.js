const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const { User, UserRole } = require("../models");

const generateToken = async (username, role) => {
  const token = jwt.sign({
      username: username,
      role: role
    }, process.env.JWT_SECRET)

  return token
}

exports.loginUser = async (req, res) => {
  
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah!" });
    }

    const userRoles = await UserRole.findAll({
      where: { userId: user.id }
    });

    const roleIds = userRoles.map(r => r.roleId);

    if (roleIds.length > 1) {

      const token = await generateToken(username, roleIds)

      return res.status(200).json({
        message: "User memiliki beberapa role. Silakan pilih salah satu.",
        roles: roleIds,
        redirect: '/choose-user-role',
        token:token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
        }
      });
    }

    const token = await generateToken(username, roleIds[0])

    return res.json({
      message: "Login berhasil",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: roleIds
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.chooseUserRole = async (req, res) => {
  const {role} = req.body
  const userRoles = req.user.role
  const username = req.user.username
  const selectedRole = parseInt(role)
  
  if (!userRoles.includes(selectedRole)) return res.status(400).json({message: "Role tidak ditemukan"})
  
  const newToken = await generateToken(username, role)

  res.json({
      message: "Berhasil memilih role",
      token: newToken
    });
}