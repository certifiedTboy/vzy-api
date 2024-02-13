const httpData = require("../constants/index");
const CustomError = require("./customError");

class unProcessableError extends CustomError {
  constructor(message = httpData.responseMessage.ERR_UNPROCESSABLE, metaData) {
    super(httpData.httpStatusCode.UNPROCESSABLE_ENTITY, message, metaData);
  }
}

module.exports = unProcessableError;
