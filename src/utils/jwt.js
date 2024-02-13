const JWT = require("jsonwebtoken");
const envVariable = require("../config/index");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = envVariable;

const generateJWTToken = (payload, expiresIn, secret) => {
  if (!expiresIn) {
    return JWT.sign(payload, secret);
  }

  return JWT.sign(payload, secret, { expiresIn });
};

const verifyAccessToken = async (token) => {
  try {
    return JWT.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyRefreshToken = async (refreshToken, sessionId) => {
  try {
    return JWT.verify(refreshToken, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { generateJWTToken, verifyAccessToken, verifyRefreshToken };
