const errorData = require("../constants/index");
const CustomError = require("./customError");

class UnauthorizedError {
  constructor(
    message = errorData.responseMessage.ERR_UNAUTHENTICATED,
    metaData
  ) {
    super(errorData.httpStatusCode.UNAUTHORIZED, message, metaData);
  }
}

module.exports = UnauthorizedError;
