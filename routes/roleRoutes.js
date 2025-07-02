const express = require("express");
const {
  getRole,
  createRole,
} = require("../controllers/roleController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.route("/")
  .get(authenticateToken, getRole)
  .post(createRole)

module.exports = router;
