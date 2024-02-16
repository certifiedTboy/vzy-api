const { loginUser } = require("../services/authServices");
const { generateAccessToken } = require("../services/refreshTokenService");
const ResponseHandler = require("../lib/responseHandler");

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    if (data) {
      const jwtTokenOptions = {
        expires: 59 * 60 * 60 * 1000,
        maxAge: 59 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      ResponseHandler.authenticated(
        res,
        data,
        jwtTokenOptions,
        "login success"
      );
    }
  } catch (error) {
    next(error);
  }
};

const refreshTokenHandler = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    const accessToken = await generateAccessToken(cookies?.refreshToken || "");

    if (!accessToken) {
      const jwtTokenOptions = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      // clear cookie data if refresh token validation fails
      ResponseHandler.clearCookie(
        res,
        {},
        jwtTokenOptions,
        "failed verification, login with valid credentials"
      );
    }

    ResponseHandler.created(res, accessToken, "success");
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    const jwtTokenOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    ResponseHandler.clearCookie(res, {}, jwtTokenOptions, "logout success");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
  refreshTokenHandler,
  userLogout,
};
