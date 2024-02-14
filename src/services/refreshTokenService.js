const JWT = require("jsonwebtoken");
const { verifyRefreshToken, generateJWTToken } = require("../utils/jwt");
const NotFoundError = require("../lib/errorInstances/notFoundError");
const envVariable = require("../config/index");

const { ACCESS_TOKEN_SECRET } = envVariable;

const generateAccessToken = async (refreshToken) => {
  // throw error error if not refresh is provided by client
  if (!refreshToken) {
    throw new NotFoundError("token does not exist");
  }

  //   verify token is authentic and still valid
  const refreshTokenPayload = await verifyRefreshToken(refreshToken);

  // On successful validation, extract payload data from valid token to generate new access token
  const PAYLOAD = { id: refreshTokenPayload.userId };
  const ACCESS_TOKEN_TTL_IN_SECONDS = 60;
  const accessToken = await generateJWTToken(
    PAYLOAD,
    ACCESS_TOKEN_TTL_IN_SECONDS,
    ACCESS_TOKEN_SECRET
  );
  // return access token generated to client
  return { accessToken };
};

module.exports = { generateAccessToken };
