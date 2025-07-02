const express = require("express");
const { loginUser, chooseUserRole } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.route("/login").post(loginUser);
router.post("/choose-user-role", authenticateToken, chooseUserRole)

module.exports = router;