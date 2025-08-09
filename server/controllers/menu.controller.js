const path = require("path");
const fs = require("fs");

const DATA_PATH = path.join(__dirname, "..", "..", "data", "pizza.json");

let menu = [];
try {
  menu = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
} catch (e) {
  console.error("Failed to load menu:", e.message);
  menu = [];
}

function getMenu(_req, res) {
  res.json(menu);
}

module.exports = { getMenu, menu };
