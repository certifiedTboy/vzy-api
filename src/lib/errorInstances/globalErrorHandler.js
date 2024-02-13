const errorData = require("../constants/index");

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || errorData.httpStatusCode.SERVER_ERROR;
  const message = err.message || errorData.responseMessage.ERR_SERVER;
  const metaData = err.metaData || {};

  res.status(statusCode).send({ message, ...metaData });
};

module.exports = globalErrorHandler;
