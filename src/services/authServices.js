const { verifyPassword } = require("../utils/passwordHelper");
const { checkThatUserAlreadyExist } = require("./userServices");
const { verifyRefreshToken, generateJWTToken } = require("../utils/jwt");
const envVariable = require("../config/index");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = envVariable;

const loginUser = async (email, password) => {
  const user = await checkThatUserAlreadyExist(email);
  if (user) {
    verifyPassword(password, user.password);

    const REFRESH_TOKEN_TTL_IN_HOURS = "24h";
    const ACCESS_TOKEN_TTL_IN_SECONDS = 60;

    // generate refresh token
    const REFRESH_TOKEN = await generateJWTToken(
      { userId: user?._id },
      REFRESH_TOKEN_TTL_IN_HOURS,
      REFRESH_TOKEN_SECRET
    );

    // generate access token
    const ACCESS_TOKEN = await generateJWTToken(
      { userId: user?._id },
      ACCESS_TOKEN_TTL_IN_SECONDS,
      ACCESS_TOKEN_SECRET
    );

    return { accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN };
  }
};

module.exports = {
  loginUser,
};
