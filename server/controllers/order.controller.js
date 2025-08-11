const { newId } = require("../utils/helpers");
const orders = new Map();

function createOrder(req, res) {
  try {
    const { customer, phone, address, cart, priority = false } = req.body || {};

    if (!customer)
      return res.status(400).json({ error: "customer is required" });
    if (!phone)
      return res.status(400).json({ error: "phone number is required" });
    if (!Array.isArray(cart) || cart.length === 0)
      return res.status(400).json({ error: "cart[] is required" });

    const id = newId();
    const order = {
      id,
      customer: String(customer),
      phone: String(phone),
      address: address ? String(address) : undefined,
      status: "pending",
      cart,
      priority: !!priority,
      placedAt: new Date().toISOString(),
    };

    orders.set(id, order);
    return res.status(201).json(order);
  } catch (err) {
    return res.status(400).json({ error: err.message || "Invalid order" });
  }
}

module.exports = { createOrder };
