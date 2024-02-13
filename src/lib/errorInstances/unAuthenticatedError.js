const errorData = require("../constants/index");
const CustomError = require("./customError");

class UnauthenticatedError extends CustomError {
  constructor(
    message = errorData.responseMessage.ERR_UNAUTHENTICATED,
    metaData
  ) {
    super(errorData.httpStatusCode.UNAUTHENTICATED, message, metaData);
  }
}

module.exports = UnauthenticatedError;
