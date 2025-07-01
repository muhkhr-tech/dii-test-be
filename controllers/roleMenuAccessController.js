const { RoleMenuAccess } = require("../models");

exports.getRoleMenuAccess = async (req, res) => {
  const roleMenuAccess = await RoleMenuAccess.findAll();
  res.json(roleMenuAccess);
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