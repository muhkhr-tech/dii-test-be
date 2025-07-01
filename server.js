const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { initDB } = require("./models");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("User API with PostgreSQL is running...");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
