const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoute")
const menuRoutes = require("./routes/menuRoutes")
const roleRoutes = require("./routes/roleRoutes")
const roleMenuAccessRoutes = require("./routes/roleMenuAccessRoutes")
const { initDB } = require("./models");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Selamat Datang");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/role-menu-access", roleMenuAccessRoutes)

const PORT = process.env.PORT || 5000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
