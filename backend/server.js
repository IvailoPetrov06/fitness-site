const express = require("express");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const workoutRoutes = require("./routes/workouts");
const mealRoutes = require("./routes/meals");

const app = express();
app.use(cors());
app.use(express.json());

// Сервира assets директорията (CSS/JS)
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

// API рутове
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/meals", mealRoutes);

// Сервира HTML файлове от root
app.use(express.static(path.join(__dirname, "..")));

// Root → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Стартирай сървъра
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
