const express = require("express");
const {
  getRole,
  createRole,
} = require("../controllers/roleController");

const router = express.Router();

router.route("/")
  .get(getRole)
  .post(createRole)

module.exports = router;
