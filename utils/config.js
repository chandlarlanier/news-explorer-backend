const rateLimit = require("express-rate-limit");

const { JWT_SECRET = "secret-token" } = process.env;

const serverAddress =
  process.env.CONNECTION || "mongodb://127.0.0.1:27017/news_explorer_db";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = { JWT_SECRET, serverAddress, limiter };
