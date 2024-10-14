"use strict";
const mongoose = require("mongoose");
require("dotenv").config();
const connectString = process.env.CONNECTION_STRING;

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    if (!true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log("Mongodb Connected");
      })
      .catch((err) => console.log("Error:: " + err));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
