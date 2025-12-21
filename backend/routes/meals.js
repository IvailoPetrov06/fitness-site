const express = require("express");
const router = express.Router();

let meals = [];
let id = 1;

router.get("/", (req, res) => {
  res.json(meals);
});

router.post("/", (req, res) => {
  const { name, time, calories } = req.body;

  if (!name || !time || !calories) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const meal = {
    id: id++,
    name,
    time,
    calories
  };

  meals.push(meal);
  res.json(meal);
});

router.delete("/:id", (req, res) => {
  meals = meals.filter(m => m.id != req.params.id);
  res.json({ success: true });
});

module.exports = router;
