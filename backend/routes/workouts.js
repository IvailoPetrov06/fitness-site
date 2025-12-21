const express = require("express");
const router = express.Router();

let workouts = [];
let id = 1;

// GET all workouts
router.get("/", (req, res) => {
  res.json(workouts);
});

// POST workout
router.post("/", (req, res) => {
  const { name, time, duration } = req.body;

  const workout = {
    id: id++,
    name,
    time,
    duration
  };

  workouts.push(workout);
  res.json(workout);
});

// DELETE workout
router.delete("/:id", (req, res) => {
  workouts = workouts.filter(w => w.id != req.params.id);
  res.json({ success: true });
});

module.exports = router;
