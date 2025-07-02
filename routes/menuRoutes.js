const express = require("express");
const {
  getMenu,
  createMenu,
} = require("../controllers/menuController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, getMenu)
router.post("/", authenticateToken, createMenu)

module.exports = router;
