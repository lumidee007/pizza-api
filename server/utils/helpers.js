function newId() {
  return Math.random().toString(36).slice(2, 10);
}

function calcTotal(items) {
  return items.reduce((sum, it) => {
    const p = menu.find((m) => m.id === it.pizzaId);
    if (!p) throw new Error(`Pizza ${it.pizzaId} not found`);
    const q = Number(it.qty || 0);
    if (!Number.isFinite(q) || q <= 0)
      throw new Error(`Invalid qty for pizza ${it.pizzaId}`);
    return sum + p.unitPrice * q;
  }, 0);
}

// Demo data
const menu = [
  { id: 1, name: "Margherita", unitPrice: 10 },
  { id: 2, name: "Pepperoni", unitPrice: 12 },
  { id: 3, name: "Veggie", unitPrice: 11 },
];

const items = [
  { pizzaId: 1, qty: 2 },
  { pizzaId: 2, qty: 1 },
  { pizzaId: 3, qty: 3 },
];

// Example usage:
console.log(calcTotal(items)); // Output: 10*2 + 12*1 + 11*3 = 65
function calcTotalWithDiscount(items, discount) {
  const total = calcTotal(items);
  if (discount < 0 || discount > 100) {
    throw new Error("Invalid discount value");
  }
  return total - (total * discount) / 100;
}

export { newId, calcTotal, calcTotalWithDiscount };
