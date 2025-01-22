'use strict';

const mongoose = require("mongoose");
const { cpus } = require("os");
const _SECOND = 5000;

const countConnections = () => {
  const connections = mongoose.connections.length;
  return connections;
}

const checkOverload = () => {
  setInterval(() => {
    const numberOfConnections = countConnections();
    const numberOfCore = cpus.length;
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024;
    const maxConnections = numberOfCore * 2;

    console.log(`---------------------------------`);
    console.log(`Number of connections: ${numberOfConnections}`);
    console.log(`Number of cores: ${numberOfCore}`);
    console.log(`Memory usage: ${memoryUsage} MB`);
    console.log(`---------------------------------`);

    if (numberOfConnections > maxConnections) {
      console.log("Overload detected");
    }
  }, _SECOND);
}

const disconnect = () => {
  console.log("Disconnecting from MongoDB");
  mongoose.disconnect();
}

module.exports = { countConnections, checkOverload, disconnect };
