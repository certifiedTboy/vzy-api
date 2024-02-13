const errorData = require("../constants/index");
const CustomError = require("./customError");

class ServerError extends CustomError {
  constructor(message, metaData) {
    super(errorData.httpStatusCode.SERVER_ERROR, message, metaData);
  }
}

module.exports = ServerError;
