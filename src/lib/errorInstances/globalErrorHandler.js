const httpData = require("../constants/index");

const GlobalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpData.httpStatusCode.SERVER_ERROR;
  const message = err.message || httpData.responseMessage.ERR_SERVER;
  const metaData = err.metaData || {};

  res.status(statusCode).send({ message, ...metaData });
};

module.exports = GlobalErrorHandler;
