const httpData = require("../constants/index");
const CustomError = require("./customError");

class ServerError extends CustomError {
  constructor(message, metaData) {
    super(httpData.httpStatusCode.SERVER_ERROR, message, metaData);
  }
}

module.exports = ServerError;
