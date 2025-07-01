const express = require("express");
const {
  getRoleMenuAccess,
  updateRoleMenuAccess,
} = require("../controllers/roleMenuAccessController");

const router = express.Router();

router.route("/")
  .get(getRoleMenuAccess)
  .put(updateRoleMenuAccess)

module.exports = router;
