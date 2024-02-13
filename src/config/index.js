require("dotenv").config();

const { env } = process;

const envVariable = {
  PORT: env.PORT,
  MONGO_URL: env.MONGO_URL,
  ACCESS_TOKEN_SECRET: env.ACCESS_TOKEN_SECRET,
  REFRESH_TOEKN_SECRET: env.REFRESH_TOEKN_SECRET,
};

module.exports = envVariable;
