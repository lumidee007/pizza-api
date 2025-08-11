function newId() {
  return Math.random().toString(36).slice(2, 10);
}

function calcTotal(items) {
  return items.reduce((sum, item) => {
    const qty = Number(item.quantity || 0);
    const price = Number(item.unitPrice || 0);

    if (!Number.isFinite(qty) || qty <= 0) {
      throw new Error(`Invalid quantity for pizza ${item.pizzaId}`);
    }
    if (!Number.isFinite(price) || price < 0) {
      throw new Error(`Invalid unit price for pizza ${item.pizzaId}`);
    }
    return sum + price * qty;
  }, 0);
}

function calcTotalWithDiscount(items, discount = 0) {
  const total = calcTotal(items);
  if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
    throw new Error("Invalid discount value. Must be between 0 and 100.");
  }
  return total - (total * discount) / 100;
}

module.exports = { newId, calcTotal, calcTotalWithDiscount };
