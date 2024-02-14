const httpData = require("../constants/index");
const CustomError = require("./customError");

class UnAuthorizedError extends CustomError {
  constructor(
    message = httpData.responseMessage.ERR_UNAUTHENTICATED,
    metaData
  ) {
    super(httpData.httpStatusCode.UNAUTHORIZED, message, metaData);
  }
}

module.exports = UnAuthorizedError;
