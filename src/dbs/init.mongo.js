"use strict";

const mongoose = require("mongoose");
const { countConnections } = require("./check.connections");
const { appConfig } = require("../configs/app");

class Database {
  static instance;
  constructor() {
    this.connect();
  }
  connect() {
    mongoose.set("debug", true);
    mongoose.set("debug", {color: true});
    mongoose
      .connect(appConfig.db.uri, { maxPoolSize: appConfig.db.maxPoolSize })
      .then(() => {
        const numberOfConnections = countConnections();
        console.log(
          `Connected to MongoDB with ${numberOfConnections} connections`
        );
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB", error);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const mongooseConnection = () => Database.getInstance();

module.exports = { mongooseConnection };
