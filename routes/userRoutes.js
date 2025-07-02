const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
  getUserRoles,
} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.route("/")
  .get(authenticateToken, getUsers)
  .post(authenticateToken, createUser);

router.route("/roles")
  .put(updateUserRole);

router.route("/:id")
  .get(authenticateToken, getUser)
  .put(authenticateToken, updateUser)
  .delete(authenticateToken, deleteUser)

router.route("/:id/roles")
  .get(authenticateToken, getUserRoles)

module.exports = router;
