const httpData = require("../constants/index");
const CustomError = require("./customError");

class UnauthenticatedError extends CustomError {
  constructor(
    message = httpData.responseMessage.ERR_UNAUTHENTICATED,
    metaData
  ) {
    super(httpData.httpStatusCode.UNAUTHENTICATED, message, metaData);
  }
}

module.exports = UnauthenticatedError;
