const { RoleMenuAccess, Menu, sequelize } = require("../models");
const { buildMenuTree } = require("./menuController");

exports.getRoleMenuAccess = async (req, res) => {
  const { role } = req.user
  const allMenus = await Menu.findAll({attributes: ['id', 'name', 'path', 'parentId'], raw: true})

  const menuTree = buildMenuTree(allMenus)

  const roleMenuAccess = await sequelize.query(`
    SELECT *
    FROM role_menu_access rma
    WHERE rma."roleId" = :role
  `, {
    replacements: { role },
    type: sequelize.QueryTypes.SELECT,
  });
  
  const allowedMenuIds = roleMenuAccess.map(menu => menu.menuId)

  const menus = menuTree.filter(menu => (
    allowedMenuIds.includes(menu.id)
  ))

  res.json(menus);
};

exports.updateRoleMenuAccess = async (req, res) => {
  
  try {

    const roleMenuAccess = req.body;

    const roleId = roleMenuAccess[0].roleId;
    
    await RoleMenuAccess.destroy({ where: { roleId: roleId } });

    await RoleMenuAccess.bulkCreate(req.body, {ignoreDuplicates: true});

    return res.status(200).json({
      message: "Role menu akses berhasil diupdate"
    });
  } catch (error) {
    console.error("Error update role menu akses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};