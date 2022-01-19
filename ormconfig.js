const { MONGODB_URL, USERNAME, PASSWORD, AUTH_SOURCE, DATABASE_NAME } = require("./environment");
module.exports = {
  "type": "mongodb",
  "username": USERNAME,
  "password": PASSWORD,
  "authSource": AUTH_SOURCE,
  "database": DATABASE_NAME,
  "url": MONGODB_URL,
  "useUnifiedTopology": true,
  "synchronize": true,
  "logging": ["error", "info", "warn"],
  "entities": ["src/entity/**/*.ts"]
}