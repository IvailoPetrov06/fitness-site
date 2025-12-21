const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// ================= REGISTER =================
router.post("/register", (req, res) => {
  let { username, email, password } = req.body;

  username = username.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

  if (!username || !email || !password) {
    return res.status(400).json({ message: "MISSING_FIELDS" });
  }

  const hashed = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [username, email, hashed], err => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: "USER_EXISTS" });
    }

    res.json({ message: "REGISTER_OK" });
  });
});

// ================= LOGIN =================
router.post("/login", (req, res) => {
  let { email, password } = req.body;

  email = email.trim().toLowerCase();
  password = password.trim();

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ message: "NO_USER" });
      }

      const user = results[0];

      const ok = bcrypt.compareSync(password, user.password);
      if (!ok) {
        return res.status(401).json({ message: "WRONG_PASSWORD" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        "SECRET_KEY",
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
});

module.exports = router;
