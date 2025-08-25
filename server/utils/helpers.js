function newId() {
  return Math.random().toString(36).slice(2, 10);
}

const PRIORITY_RATE = 0.2;
const TIMES = {
  normal: { making: 25, delivery: 35 },
  priority: { making: 20, delivery: 30 },
};

function etaISO(priority) {
  const type = priority ? TIMES.priority : TIMES.normal;
  const totalMinutes = type.making + type.delivery;
  return new Date(Date.now() + totalMinutes * 60 * 1000).toISOString();
}

function calcTotal(items) {
  return items.reduce((sum, item) => {
    const qty = item.quantity || 0;
    const price = item.unitPrice || 0;

    if (!Number.isFinite(qty) || qty <= 0) {
      throw new Error(`Invalid quantity for pizza ${item.id}`);
    }
    if (!Number.isFinite(price) || price < 0) {
      throw new Error(`Invalid unit price for pizza ${item.id}`);
    }
    return sum + price * qty;
  }, 0.0);
}

function calcTotalWithDiscount(items, discount) {
  const total = calcTotal(items);
  if (!Number.isFinite(discount) || discount < 0 || discount > 1) {
    throw new Error("Invalid discount value. Must be between 0 and 1.");
  }
  return total + total * discount;
}

module.exports = {
  newId,
  calcTotal,
  calcTotalWithDiscount,
  etaISO,
  PRIORITY_RATE,
  TIMES,
};
