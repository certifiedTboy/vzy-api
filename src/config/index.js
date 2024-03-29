require("dotenv").config();

const { env } = process;

const envVariable = {
  PORT: env.PORT,
  MONGO_URL: env.MONGO_URL,
  ACCESS_TOKEN_SECRET: env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: env.REFRESH_TOKEN_SECRET,
  STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_KEY: env.STRIPE_WEBHOOK_KEY,
};

module.exports = envVariable;
