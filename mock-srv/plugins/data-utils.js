"use strict";
import fp from "fastify-plugin";
import {promisify} from "node:util"

// Promisify setTimeout
const timeout = promisify(setTimeout);

const orders = {
  A1: { total: 3 },
  A2: { total: 7 },
  B1: { total: 101 },
};

const catToPrefix = {
  electronics: "A",
  confectionery: "B",
};

async function* realtimeOrdersSimulator() {
  const ids = Object.keys(orders);
  while (true) {
    const delta = Math.floor(Math.random() * 7) + 1;
    const id = ids[Math.floor(Math.random() * ids.length)];
    orders[id].total += delta;
    const { total } = orders[id];
    yield JSON.stringify({ id, total });
    await timeout(1500);
  }
}

function* currentOrders(category) {
  const idPrefix = catToPrefix[category];
  if (!idPrefix) return;
  const ids = Object.keys(orders).filter((id) => id[0] === idPrefix);
  for (const id of ids)
    yield JSON.stringify({ id, ...orders[id] });
  }