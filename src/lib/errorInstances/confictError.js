const httpData = require("../constants/index");
const CustomError = require("./customError");

class ConflictError extends CustomError {
  constructor(message = httpData.responseMessage.ERR_CONFLICT, metaData = {}) {
    super(httpData.httpStatusCode.CONFLICT, message, metaData);
  }
}

module.exports = ConflictError;
