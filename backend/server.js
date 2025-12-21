const express = require("express");
const path = require("path");
const cors = require("cors");

require("./db");

const authRoutes = require("./routes/auth");
const workoutRoutes = require("./routes/workouts");
const mealRoutes = require("./routes/meals");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 СЕРВИРА ЦЕЛИЯ ROOT ПРОЕКТ (FITNESITE)
app.use(express.static(path.join(__dirname, "..")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/meals", mealRoutes);

// 🔥 ROOT → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
