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

const router = express.Router();

router.route("/")
  .get(getUsers)
  .post(createUser);

router.route("/roles")
  .put(updateUserRole);

router.route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

router.route("/:id/roles")
  .get(getUserRoles)

module.exports = router;
