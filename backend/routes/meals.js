const express = require("express");
const router = express.Router();

let meals = [];
let id = 1;

// GET all meals
router.get("/", (req, res) => {
  res.json(meals);
});

// POST meal
router.post("/", (req, res) => {
  const { name, time, calories } = req.body;

  const meal = {
    id: id++,
    name,
    time,
    calories
  };

  meals.push(meal);
  res.json(meal);
});

// DELETE meal
router.delete("/:id", (req, res) => {
  meals = meals.filter(m => m.id != req.params.id);
  res.json({ success: true });
});

module.exports = router;
