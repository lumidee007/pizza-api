const express = require("express");
const {
  createOrder,
  getOrder,
  updateOrder,
} = require("../controllers/order.controller.js");

const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.patch("/:id/priority", updateOrder);

module.exports = router;
