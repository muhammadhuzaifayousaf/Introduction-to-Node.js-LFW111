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