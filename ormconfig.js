module.exports = {
  "type": "mongodb",
  "username": "root",
  "password": "example",
  "authSource": "admin",
  "database": "PE_MS",
  "url": process.env.PEX_MS_URL,
  "useUnifiedTopology": true,
  "logging": ["error", "info", "warn"],
  "entities": ["src/entity/**/*.ts"]
}