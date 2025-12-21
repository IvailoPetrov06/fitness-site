const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ivko0612!",
  database: "fitness_site"
});

db.connect(err => {
  if (err) {
    console.error("MySQL ERROR:", err.message);
    return;
  }
  console.log("MySQL connected ✅");
});

module.exports = db;
