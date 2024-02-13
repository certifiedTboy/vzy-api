const errorData = require("../constants/index");
const CustomError = require("./customError");

class UnprocessableError extends CustomError {
  constructor(message = errorData.responseMessage.ERR_UNPROCESSABLE, metaData) {
    super(errorData.httpStatusCode.UNPROCESSABLE_ENTITY, message, metaData);
  }
}

module.exports = UnprocessableError;
