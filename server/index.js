const express = require("express");
const cors = require("cors");
const menuRouter = require("./routes/menu.route.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/menu", menuRouter);

app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
