const dotenv = require("dotenv");
const env = require("process");

dotenv.config();

const appConfig = {
  app: {
    env: env.ENV || "development",
    port: process.env.PORT || 3000,
  },
  db: {
    uri: process.env.MONGO_URI || "",
    maxPoolSize: 5,
  },
};

module.exports = { appConfig };
