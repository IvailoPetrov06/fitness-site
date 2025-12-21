const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// GET всички хранения на потребителя
router.get("/", auth, (req, res) => {
  const sql = "SELECT * FROM meals WHERE user_id = ?";
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST ново хранене
router.post("/", auth, (req, res) => {
  const { name, time, calories } = req.body;
  if (!name || !time || !calories) return res.status(400).json({ error: "Invalid data" });

  const sql = "INSERT INTO meals (user_id, name, time, calories) VALUES (?, ?, ?, ?)";
  db.query(sql, [req.userId, name, time, calories], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, time, calories });
  });
});

// DELETE хранене
router.delete("/:id", auth, (req, res) => {
  const sql = "DELETE FROM meals WHERE id = ? AND user_id = ?";
  db.query(sql, [req.params.id, req.userId], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
