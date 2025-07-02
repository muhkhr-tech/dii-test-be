const express = require("express");
const {
  getRoleMenuAccess,
  updateRoleMenuAccess,
} = require("../controllers/roleMenuAccessController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.route("/")
  .get(authenticateToken, getRoleMenuAccess)
  .put(authenticateToken, updateRoleMenuAccess)

module.exports = router;
