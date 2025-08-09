const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// --- Load menu data ---
const DATA_PATH = path.join(__dirname, "..", "data", "pizza.json");
const menu = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

app.get("/menu", (_req, res) => {
  res.json(menu);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
