const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const { User, UserRole, RoleMenuAccess, Menu } = require("../models");
const { buildMenuTree } = require('./menuController');

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
      return res.status(404).json({ message: "User tidak ditemukan" });
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

    let menu = []

    if (roleIds[0]) {
      const menus = await Menu.findAll({attributes: ['id', 'name', 'path', 'parentId'], raw: true})

      menu = buildMenuTree(menus)

    }

    return res.json({
      message: "Login berhasil",
      token: token,
      menu: menu,
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
  
  if (!Array.isArray(userRoles)) {
    return res.status(200).json({ message: "Anda sudah memilih role" });
  }
  
  if (!userRoles.includes(selectedRole)) return res.status(400).json({message: "Role tidak ditemukan"})
  
  const newToken = await generateToken(username, selectedRole)

  let menu = []

  if (selectedRole) {
    const menus = await Menu.findAll({attributes: ['id', 'name', 'path', 'parentId'], raw: true})

    menu = buildMenuTree(menus)

  }

  res.json({
      message: "Berhasil memilih role",
      token: newToken,
      menu: menu
    });
}