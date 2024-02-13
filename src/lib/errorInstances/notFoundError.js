const errorData = require("../constants/index");
const CustomError = require("./customError");

class NotFoundError extends CustomError {
  constructor(
    message = errorData.responseMessage.ERR_NOT_FOUND,
    metaData = {}
  ) {
    super(errorData.httpStatusCode.NOT_FOUND, message, metaData);
  }
}

module.exports = NotFoundError;
