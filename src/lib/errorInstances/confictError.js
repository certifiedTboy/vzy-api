const errorData = require("../constants/index");
const CustomError = require("./customError");

class ConflictError extends CustomError {
  constructor(message = errorData.responseMessage.ERR_CONFLICT, metaData = {}) {
    super(errorData.httpStatusCode.CONFLICT, message, metaData);
  }
}

module.exports = ConflictError;
