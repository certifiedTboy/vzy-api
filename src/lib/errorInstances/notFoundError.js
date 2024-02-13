const httpData = require("../constants/index");
const CustomError = require("./customError");

class notFoundError extends CustomError {
  constructor(message = httpData.responseMessage.ERR_NOT_FOUND, metaData = {}) {
    super(httpData.httpStatusCode.NOT_FOUND, message, metaData);
  }
}

module.exports = notFoundError;
