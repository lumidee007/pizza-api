const express = require("express");
const { getMenu } = require("../controllers/menu.controller.js");

const router = express.Router();

router.get("/", getMenu);

module.exports = router;
