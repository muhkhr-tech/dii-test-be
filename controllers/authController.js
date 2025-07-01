const bcrypt = require("bcrypt")
const { User } = require("../models");

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah!" });
    }

    return res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        username: user.username,
        name: user.name
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
