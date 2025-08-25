const { newId } = require("../utils/helpers");
const orders = new Map();
const { calcTotal, PRIORITY_RATE, etaISO } = require("../utils/helpers");

function createOrder(req, res) {
  try {
    const { customer, phone, address, cart, priority = false } = req.body || {};

    if (!customer)
      return res.status(400).json({ error: "customer is required" });
    if (!phone)
      return res.status(400).json({ error: "phone number is required" });
    if (!Array.isArray(cart) || cart.length === 0)
      return res.status(400).json({ error: "cart[] is required" });

    const orderPrice = calcTotal(cart);
    const priorityPrice = priority
      ? Number((orderPrice * PRIORITY_RATE).toFixed(2))
      : 0;
    const estimatedDelivery = etaISO(priority);

    const id = newId();

    const order = {
      id,
      customer: String(customer),
      phone: String(phone),
      address: address ? String(address) : undefined,
      status: "preparing",
      cart,
      priority: !!priority,
      orderPrice,
      priorityPrice,
      totalPrice: priority ? orderPrice + priorityPrice : orderPrice,
      placedAt: new Date().toISOString(),
      estimatedDelivery,
    };

    orders.set(id, order);
    return res.status(201).json(order);
  } catch (err) {
    return res.status(400).json({ error: err.message || "Invalid order" });
  }
}

function getOrder(req, res) {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  return res.json(order);
}

function updateOrder(req, res) {
  const { id } = req.params;
  const { priority } = req.body;

  // Find the order
  const order = orders.get(id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Update priority
  order.priority = priority;

  // If priority is true, calculate priority price, else set it to 0
  order.priorityPrice = priority ? order.totalPrice * PRIORITY_RATE : 0;

  // Update totalPrice
  order.totalPrice = order.totalPrice + order.priorityPrice;

  return res.status(200).json({
    message: "Order priority and price updated successfully",
    order,
  });
}

module.exports = { createOrder, getOrder, updateOrder };
