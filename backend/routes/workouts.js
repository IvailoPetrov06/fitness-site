const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// GET всички тренировки на потребителя
router.get("/", auth, (req, res) => {
  const sql = "SELECT * FROM workouts WHERE user_id = ?";
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST нова тренировка
router.post("/", auth, (req, res) => {
  const { name, time, duration } = req.body;
  if (!name || !time || !duration) return res.status(400).json({ error: "Invalid data" });

  const sql = "INSERT INTO workouts (user_id, name, time, duration) VALUES (?, ?, ?, ?)";
  db.query(sql, [req.userId, name, time, duration], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, time, duration });
  });
});

// DELETE тренировка
router.delete("/:id", auth, (req, res) => {
  const sql = "DELETE FROM workouts WHERE id = ? AND user_id = ?";
  db.query(sql, [req.params.id, req.userId], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
