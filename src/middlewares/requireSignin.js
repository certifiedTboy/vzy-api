const { verifyAccessToken } = require("../utils/jwt");
const unProcessableError = require("../lib/errorInstances/unProcessableError");

const Authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const authToken = _checkThatValidTokenFormatIsProvided(authHeader);
    const authPayload = await verifyAccessToken(authToken);

    req.user = authPayload;
    next();
  } catch (error) {
    next(error);
  }
};

const _checkThatValidTokenFormatIsProvided = (authToken) => {
  let splitToken;

  if (
    !authToken ||
    (splitToken = authToken.split(" ")).length !== 2 ||
    splitToken[0].toLowerCase() !== "bearer" ||
    !splitToken[1]
  ) {
    throw new unProcessableError("Invalid token!");
  }

  return splitToken[1];
};

module.exports = Authenticate;
